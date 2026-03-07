/**
 * GOD-SWARM ULTRA — DevOps Agent
 * Deploys infrastructure and manages containers/Kubernetes
 */

import type { AgentExecutionContext } from './base.js';
import type { TaskOutput, Artifact } from '../swarm/types.js';
import { BaseAgent } from './base.js';

export interface InfrastructureSpec {
  type: 'docker' | 'kubernetes' | 'terraform' | 'ansible';
  environment: 'development' | 'staging' | 'production';
  services: ServiceSpec[];
}

export interface ServiceSpec {
  name: string;
  image?: string;
  replicas?: number;
  port?: number;
  env?: Record<string, string>;
  resources?: { cpu?: string; memory?: string };
}

export interface DeploymentResult {
  spec: InfrastructureSpec;
  manifests: Array<{ filename: string; content: string }>;
  deploymentPlan: string[];
  estimatedDurationMin: number;
}

export class DevOpsAgent extends BaseAgent {
  constructor() {
    super('devops', 'DevOps Agent', {
      tools: [
        'docker-cli',
        'kubectl',
        'terraform',
        'helm',
        'aws-cli',
        'gcloud',
        'ansible',
        'github-actions',
      ],
      models: ['gpt-4o', 'claude-3-5-sonnet-20241022'],
      maxConcurrentTasks: 2,
    });
  }

  async execute(context: AgentExecutionContext): Promise<TaskOutput> {
    this.setStatus('running');
    const logs: string[] = [];

    try {
      const prompt = context.task.input.prompt ?? context.task.description;
      logs.push(`[DevOpsAgent] Processing deployment request: ${prompt}`);

      const taskCtx = context.task.input.context ?? {};
      const infraType = (taskCtx['type'] as string) ?? 'kubernetes';
      const environment = (taskCtx['environment'] as string) ?? 'production';

      const spec: InfrastructureSpec = {
        type: infraType as InfrastructureSpec['type'],
        environment: environment as InfrastructureSpec['environment'],
        services: (taskCtx['services'] as ServiceSpec[]) ?? [
          { name: 'api', image: 'cyberai/api:latest', replicas: 3, port: 3000 },
          { name: 'worker', image: 'cyberai/worker:latest', replicas: 2 },
        ],
      };

      const result = this.generateDeploymentManifests(spec);
      logs.push(`[DevOpsAgent] Generated ${result.manifests.length} manifests`);
      result.manifests.forEach(m => logs.push(`  → ${m.filename}`));

      const artifacts: Artifact[] = result.manifests.map(m => ({
        id: `devops-${Date.now()}-${m.filename.replace(/\//g, '-')}`,
        type: 'file',
        name: m.filename,
        content: m.content,
        mimeType: 'text/yaml',
      }));

      this.setStatus('idle');
      return {
        result,
        artifacts,
        logs,
        metrics: { startTime: new Date(), endTime: new Date() },
      };
    } catch (err) {
      this.setStatus('error');
      return {
        error: err instanceof Error ? err.message : String(err),
        logs,
        metrics: { startTime: new Date(), endTime: new Date() },
      };
    }
  }

  private generateDeploymentManifests(spec: InfrastructureSpec): DeploymentResult {
    const manifests: Array<{ filename: string; content: string }> = [];

    if (spec.type === 'kubernetes') {
      for (const service of spec.services) {
        manifests.push({
          filename: `k8s/${service.name}-deployment.yaml`,
          content: this.generateK8sDeployment(service, spec.environment),
        });

        if (service.port) {
          manifests.push({
            filename: `k8s/${service.name}-service.yaml`,
            content: this.generateK8sService(service, spec.environment),
          });
        }
      }

      manifests.push({
        filename: 'k8s/namespace.yaml',
        content: this.generateK8sNamespace(spec.environment),
      });
    } else if (spec.type === 'docker') {
      manifests.push({
        filename: 'docker-compose.deploy.yml',
        content: this.generateDockerCompose(spec),
      });
    }

    return {
      spec,
      manifests,
      deploymentPlan: [
        '1. Apply namespace configuration',
        '2. Deploy services in dependency order',
        '3. Verify health checks pass',
        '4. Run smoke tests',
        '5. Update DNS / load balancer',
      ],
      estimatedDurationMin: 10,
    };
  }

  private generateK8sDeployment(service: ServiceSpec, environment: string): string {
    const replicas = service.replicas ?? 1;
    return `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${service.name}
  namespace: cyberai-${environment}
  labels:
    app: ${service.name}
    env: ${environment}
    managed-by: god-swarm-ultra
spec:
  replicas: ${replicas}
  selector:
    matchLabels:
      app: ${service.name}
  template:
    metadata:
      labels:
        app: ${service.name}
        version: "1.0.0"
    spec:
      containers:
        - name: ${service.name}
          image: ${service.image ?? `cyberai/${service.name}:latest`}
          ports:${service.port ? `\n            - containerPort: ${service.port}` : ' []'}
          resources:
            requests:
              cpu: ${service.resources?.cpu ?? '100m'}
              memory: ${service.resources?.memory ?? '128Mi'}
            limits:
              cpu: ${service.resources?.cpu ?? '500m'}
              memory: ${service.resources?.memory ?? '512Mi'}
          livenessProbe:
            httpGet:
              path: /health
              port: ${service.port ?? 3000}
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: ${service.port ?? 3000}
            initialDelaySeconds: 5
            periodSeconds: 5
`;
  }

  private generateK8sService(service: ServiceSpec, environment: string): string {
    return `apiVersion: v1
kind: Service
metadata:
  name: ${service.name}
  namespace: cyberai-${environment}
  labels:
    app: ${service.name}
spec:
  selector:
    app: ${service.name}
  ports:
    - protocol: TCP
      port: 80
      targetPort: ${service.port}
  type: ClusterIP
`;
  }

  private generateK8sNamespace(environment: string): string {
    return `apiVersion: v1
kind: Namespace
metadata:
  name: cyberai-${environment}
  labels:
    environment: ${environment}
    managed-by: god-swarm-ultra
`;
  }

  private generateDockerCompose(spec: InfrastructureSpec): string {
    const services = spec.services
      .map(
        s => `  ${s.name}:
    image: ${s.image ?? `cyberai/${s.name}:latest`}
    restart: unless-stopped${s.port ? `\n    ports:\n      - "${s.port}:${s.port}"` : ''}
    environment:
      - NODE_ENV=${spec.environment}
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:${s.port ?? 3000}/health"]
      interval: 30s
      timeout: 10s
      retries: 3`
      )
      .join('\n\n');

    return `version: '3.8'

services:
${services}

networks:
  cyberai-net:
    driver: bridge
`;
  }
}
