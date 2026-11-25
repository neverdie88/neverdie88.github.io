window.GCP_SERVICES_DENDRITE = {
  "soma": {
    "title": "Google Cloud Platform",
    "subtitle": "Complete Service Catalog & Containment Map (PCA v6.1)"
  },
  "trunks": [
    {
      "id": "u1-ai-ml",
      "code": "U1",
      "shortTitle": "AI, Agent Platform & Pretrained APIs",
      "title": "1. AI, ML & Generative AI Portfolio",
      "subtitle": "Vertex AI (Agent Platform) vs. Pre-trained APIs vs. Turnkey Gemini Apps",
      "color": "#7c3aed",
      "bgTint": "#f5f3ff",
      "branches": [
        {
          "id": "ai-vertex-models",
          "code": "1A",
          "title": "Vertex AI — Models & Notebooks (Inside Agent Platform)",
          "badge": "Included in Vertex AI · Ch 41",
          "summary": "Everything inside Vertex AI (called \"Agent Platform\" in updated GCP Architecture Ch 41) for discovering models and interactive data science.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Model Garden: Catalog of 200+ Google (Gemini, Imagen, Chirp), Open (Gemma, Llama, Mistral) & Partner (Claude) models"
            },
            {
              "kind": "svc",
              "label": "📦 Vertex AI Studio & Agent Builder (RAG Engine / Vector Search): Prompt design, tuning & custom grounded AI agents"
            },
            {
              "kind": "svc",
              "label": "📦 Colab Enterprise: Serverless zero-setup Python notebooks natively integrated inside BigQuery & Vertex AI"
            },
            {
              "kind": "svc",
              "label": "📦 Vertex AI Workbench: Dedicated user-managed JupyterLab VM instances (custom VPC, custom Docker/GPUs)"
            }
          ]
        },
        {
          "id": "ai-vertex-train-serve",
          "code": "1B",
          "title": "Vertex AI — Training & Prediction Serving (Inside Agent Platform)",
          "badge": "Included in Vertex AI · Ch 41",
          "summary": "Included inside Vertex AI for training your own models and serving online or batch predictions.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Vertex AI AutoML: No-code custom model training on YOUR labeled Tabular, Image, Text, or Video Managed Datasets"
            },
            {
              "kind": "svc",
              "label": "📦 Vertex AI Custom Training: Full-code PyTorch / TensorFlow / JAX / XGBoost training jobs (prebuilt or custom containers)"
            },
            {
              "kind": "svc",
              "label": "📦 Vertex AI Endpoints: Synchronous low-latency HTTPS online serving with traffic splitting & autoscaling"
            },
            {
              "kind": "svc",
              "label": "📦 Vertex AI Batch Prediction: Asynchronous bulk scoring of millions of BigQuery / Cloud Storage records (scales to 0!)"
            }
          ]
        },
        {
          "id": "ai-vertex-mlops",
          "code": "1C",
          "title": "Vertex AI — MLOps, Feature Store & Monitoring (Inside Agent Platform)",
          "badge": "Included in Vertex AI · Ch 41",
          "summary": "Governance, feature sharing, pipeline orchestration, and drift/skew detection built inside Vertex AI.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Vertex AI Feature Store: BigQuery offline store + low-ms online store preventing training-serving skew"
            },
            {
              "kind": "svc",
              "label": "📦 Vertex AI Pipelines: Serverless Kubeflow Pipelines (KFP) & TFX workflow DAG runner"
            },
            {
              "kind": "svc",
              "label": "📦 Model Registry + Experiments + ML Metadata: Central model versioning, hyperparameter tracking & artifact lineage"
            },
            {
              "kind": "svc",
              "label": "📦 Vertex AI Model Monitoring: Alerts on Training-Serving Skew (vs training data) & Prediction Drift (live shift over time)"
            }
          ]
        },
        {
          "id": "ai-pretrained-apis",
          "code": "1D",
          "title": "Pre-trained Cloud AI APIs (SEPARATE from Custom Vertex Training!)",
          "badge": "Standalone Turnkey REST APIs · Ch 40",
          "summary": "Out-of-the-box APIs requiring ZERO training data and ZERO ML models — just send JSON/files and receive predictions!",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Document AI: Specialized OCR + structured parsers for Invoices, Receipts, W-2s, IDs, Contracts & Lending forms"
            },
            {
              "kind": "svc",
              "label": "📦 Cloud Vision API & Cloud Video Intelligence API: Object/label detection, OCR, face blur, SafeSearch moderation"
            },
            {
              "kind": "svc",
              "label": "📦 Cloud Speech-to-Text & Text-to-Speech (includes Chirp 3 HD Gemini Voices!): Audio transcription & neural speech"
            },
            {
              "kind": "svc",
              "label": "📦 Cloud Translation API & Cloud Natural Language API: 130+ language translation, sentiment & entity extraction"
            }
          ]
        },
        {
          "id": "ai-turnkey-apps",
          "code": "1E",
          "title": "Turnkey Gemini Apps & AI Hardware (Outside Raw ML Training)",
          "badge": "End-User SaaS & Accelerators · Ch 42–45",
          "summary": "Ready-to-use Google AI assistants for employees/architects plus underlying TPU/GPU supercomputing hardware.",
          "spines": [
            {
              "kind": "rename",
              "label": "🔄 Gemini Enterprise (formerly Agentspace · Ch 45): Employee enterprise search & no-code agents across Workspace/Jira/SharePoint"
            },
            {
              "kind": "svc",
              "label": "📦 Gemini Cloud Assist (Ch 43): GCP Console/CLI AI co-pilot for architecture design, log RCA, FinOps & Terraform generation"
            },
            {
              "kind": "svc",
              "label": "📦 NotebookLM Enterprise (Ch 44): Source-grounded research notebook & audio briefings with strict inline citations"
            },
            {
              "kind": "svc",
              "label": "📦 AI Hypercomputer (Ch 42): Cloud TPUs (v5e/v5p/Trillium) + GPU VMs (A3 H100, G2 L4) + Dynamic Workload Scheduler (DWS)"
            }
          ]
        }
      ]
    },
    {
      "id": "u2-compute",
      "code": "U2",
      "shortTitle": "Compute, GKE Enterprise & Serverless",
      "title": "2. Compute, Containers & Serverless Portfolio",
      "subtitle": "Compute Engine vs. GKE / GKE Enterprise (Anthos) vs. Cloud Run Family vs. Dedicated Hardware",
      "color": "#2563eb",
      "bgTint": "#eff6ff",
      "branches": [
        {
          "id": "cmp-gce",
          "code": "2A",
          "title": "Compute Engine (IaaS Virtual Machines)",
          "badge": "Full OS Control · Ch 06",
          "summary": "Customizable Linux & Windows VMs, auto-healing instance groups, Spot capacity, and physical BYOL hosts.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 VM Series: E2/N2/N4 (General) · C2/C3/C4 (Compute) · M2/M3 (Memory SAP) · Z3 (Storage) · A2/A3/G2 (GPUs)"
            },
            {
              "kind": "svc",
              "label": "📦 Managed Instance Groups (MIGs): Regional/Zonal autohealing, autoscaling, rolling/canary updates & Stateful MIGs"
            },
            {
              "kind": "svc",
              "label": "📦 Spot VMs (replaces Preemptible VMs — no 24h max limit!) & Sole-Tenant Nodes (dedicated physical server for BYOL)"
            }
          ]
        },
        {
          "id": "cmp-gke",
          "code": "2B",
          "title": "GKE & GKE Enterprise (formerly Anthos — What Is Inside!)",
          "badge": "Kubernetes & Multi-Cluster · Ch 07",
          "summary": "Managed Kubernetes (Autopilot vs Standard) plus the GKE Enterprise fleet governance & GitOps add-on suite.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 GKE Modes: GKE Autopilot (serverless node-free K8s, billed per Pod) vs. GKE Standard (custom Node Pools)"
            },
            {
              "kind": "rename",
              "label": "🔄 Inside GKE Enterprise (formerly Anthos): Fleets + Config Sync (GitOps) + Policy Controller (OPA) + Cloud Service Mesh (Istio)"
            },
            {
              "kind": "svc",
              "label": "📦 Config Connector: Manage GCP services (Cloud SQL, Buckets, IAM) declaratively using Kubernetes YAML CRDs!"
            },
            {
              "kind": "svc",
              "label": "📦 GKE Distributed Cloud: GKE on VMware, GKE on Bare Metal, & GKE Multi-Cloud (AWS / Azure)"
            }
          ]
        },
        {
          "id": "cmp-serverless",
          "code": "2C",
          "title": "Serverless Compute Family (Cloud Run, Functions & App Engine)",
          "badge": "Scales 0 -> N · Ch 08, 10, 11",
          "summary": "Zero-server-management container and function runtimes.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Cloud Run: Cloud Run Services (HTTP/gRPC containers) + Cloud Run Jobs (batch tasks up to 24h)"
            },
            {
              "kind": "rename",
              "label": "🔄 Cloud Run functions (formerly Cloud Functions 2nd Gen · Ch 11): Event-driven code snippets + Eventarc (90+ audit/GCS triggers)"
            },
            {
              "kind": "svc",
              "label": "📦 App Engine: Standard (sandboxed runtime, scales to 0) vs. Flexible (Docker on GCE VMs, min 1 instance)"
            }
          ]
        },
        {
          "id": "cmp-dedicated",
          "code": "2D",
          "title": "VMware, Bare Metal & HPC Batch",
          "badge": "Lift-and-Shift & HPC · Ch 49",
          "summary": "Dedicated private cloud hardware for VMware vSphere, Oracle licensing, and HPC batch scheduling.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Google Cloud VMware Engine (GCVE): Managed vSphere + vCenter + vSAN + NSX-T + HCX L2 stretch"
            },
            {
              "kind": "svc",
              "label": "📦 Bare Metal Solution (for Oracle / SAP) & Oracle Database@Google Cloud · Cloud Batch (managed HPC job scheduler)"
            }
          ]
        }
      ]
    },
    {
      "id": "u3-storage-db",
      "code": "U3",
      "shortTitle": "Storage, SQL, NoSQL & Caching",
      "title": "3. Storage, Databases & Caching Portfolio",
      "subtitle": "Block/File/Object Storage + Relational SQL + NoSQL + In-Memory Stores",
      "color": "#059669",
      "bgTint": "#ecfdf5",
      "branches": [
        {
          "id": "db-storage",
          "code": "3A",
          "title": "Block, File & Object Storage",
          "badge": "Disks, NFS & Buckets · Ch 06, 20",
          "summary": "Raw block volumes for VMs, shared NFS/SMB file shares, and global 11-nines object buckets.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Block (GCE/GKE): Persistent Disk (Standard/Balanced/SSD/Extreme, Regional PD) · Hyperdisk (Balanced/Extreme/ML) · Local SSD"
            },
            {
              "kind": "svc",
              "label": "📦 Shared File (NFS/SMB): Filestore (Basic HDD/SSD, Zonal HPC, Enterprise/Regional HA) · Google Cloud NetApp Volumes"
            },
            {
              "kind": "svc",
              "label": "📦 Object (Ch 20): Cloud Storage (Standard, Nearline, Coldline, Archive, Autoclass, Bucket Lock WORM, Signed URLs, GCS FUSE)"
            }
          ]
        },
        {
          "id": "db-sql",
          "code": "3B",
          "title": "Managed Relational (SQL) Databases",
          "badge": "ACID OLTP & HTAP · Ch 23, 24, 27",
          "summary": "Regional and multi-regional SQL transactional databases.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Cloud SQL (Ch 23): Managed MySQL, PostgreSQL & SQL Server (<=64 TB, Regional HA standby, Read Replicas, Auth Proxy)"
            },
            {
              "kind": "svc",
              "label": "📦 AlloyDB for PostgreSQL (Ch 24): 4x faster PG + 100x Columnar HTAP + 99.99% SLA + pgvector AI + AlloyDB Omni"
            },
            {
              "kind": "svc",
              "label": "📦 Cloud Spanner (Ch 27): Global multi-region horizontal-write SQL + Spanner Graph (TrueTime strong consistency, 99.999% SLA)"
            }
          ]
        },
        {
          "id": "db-nosql-cache",
          "code": "3C",
          "title": "NoSQL & In-Memory Databases (incl. Firebase Suite)",
          "badge": "Docs, Wide-Column & Cache · Ch 22, 25, 26",
          "summary": "Serverless JSON documents, petabyte sub-10ms wide-column tables, and sub-ms RAM caches.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Firestore (Ch 25 — inside Firebase alongside Firebase Auth/Hosting): Serverless JSON Document DB (Native vs Datastore Mode)"
            },
            {
              "kind": "svc",
              "label": "📦 Cloud Bigtable (Ch 22): Petabyte HBase-compatible wide-column NoSQL (<10ms at >10k QPS for IoT, AdTech & FinTech)"
            },
            {
              "kind": "svc",
              "label": "📦 Memorystore (Ch 26): Sub-ms managed RAM cache — Memorystore for Redis / Redis Cluster, Valkey, & Memcached"
            }
          ]
        }
      ]
    },
    {
      "id": "u4-data-apis",
      "code": "U4",
      "shortTitle": "BigQuery, Data Pipelines & APIs",
      "title": "4. Analytics, Data Pipelines, Messaging & APIs",
      "subtitle": "BigQuery & Dataplex Ecosystem + Dataflow/Spark + Pub/Sub/Tasks + Apigee/API Gateway",
      "color": "#0891b2",
      "bgTint": "#ecfeff",
      "branches": [
        {
          "id": "da-bigquery",
          "code": "4A",
          "title": "BigQuery, Lakehouse & Governance Ecosystem (What Is Inside!)",
          "badge": "Warehouse, Lake & BI · Ch 21",
          "summary": "Serverless petabyte SQL warehouse plus its built-in ML, multi-cloud, ELT, catalog, and BI sub-products.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Inside BigQuery: BigQuery SQL + BigQuery ML (BQML) + BI Engine (RAM cache) + BQ Data Transfer Service + Dataform (SQL dbt)"
            },
            {
              "kind": "svc",
              "label": "📦 Lakehouse & Multi-Cloud: BigLake (unified Iceberg/Delta/Parquet tables on GCS) + BigQuery Omni (query AWS S3 / Azure Blob)"
            },
            {
              "kind": "rename",
              "label": "🔄 Dataplex Universal Catalog (absorbs Data Catalog!): Automated data quality, lineage, governance & Policy Tags (Column Security)"
            },
            {
              "kind": "svc",
              "label": "📦 BI Layer: Looker (enterprise governed LookML platform) vs. Looker Studio (self-service visual dashboards)"
            }
          ]
        },
        {
          "id": "da-pipelines",
          "code": "4B",
          "title": "ETL, Streaming, Spark & Workflow Orchestration",
          "badge": "Beam, Spark & Airflow · Ch 29, 30, 31",
          "summary": "Data movement, transformation, and multi-step orchestration engines.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Cloud Dataflow (Ch 29): Serverless auto-scaling Apache Beam runner for unified real-time streaming & batch ETL"
            },
            {
              "kind": "rename",
              "label": "🔄 Dataproc / Managed Service for Apache Spark (Ch 30): Managed Hadoop/PySpark/Hive clusters + Dataproc Serverless"
            },
            {
              "kind": "svc",
              "label": "📦 Datastream (serverless CDC into BQ/GCS) · Dataprep (Ch 31 visual wrangling) · Cloud Data Fusion (visual CDAP ETL)"
            },
            {
              "kind": "svc",
              "label": "📦 Orchestration: Cloud Composer (managed Apache Airflow for data DAGs) vs. Workflows (serverless HTTP/API step state machine)"
            }
          ]
        },
        {
          "id": "da-msg-api",
          "code": "4C",
          "title": "Messaging, Queues, iPaaS & API Management",
          "badge": "Events & APIs · Ch 28, 39, 46, 50",
          "summary": "Event buses, throttled HTTP queues, enterprise ERP connectors, and external/internal API gateways.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Messaging & Cron: Cloud Pub/Sub (1-to-many global event bus) · Cloud Tasks (1-to-1 rate-throttled queue) · Cloud Scheduler (cron)"
            },
            {
              "kind": "svc",
              "label": "📦 Application Integration + Integration Connectors (Ch 50): No-code iPaaS connecting Salesforce, SAP, ServiceNow, Workday"
            },
            {
              "kind": "svc",
              "label": "📦 API Gateways (Ch 39): Apigee (monetization, portal, SOAP/XML) · API Gateway (serverless Run/Functions) · Cloud Endpoints (ESPv2 gRPC)"
            }
          ]
        }
      ]
    },
    {
      "id": "u5-networking",
      "code": "U5",
      "shortTitle": "Networking, Load Balancers & Edge",
      "title": "5. Networking, Hybrid & Edge Delivery Portfolio",
      "subtitle": "VPC, Private Connectivity, Hybrid Links, Load Balancers & CDN (See 🕸️ Network Dendrite for deep packet flows!)",
      "color": "#ea580c",
      "bgTint": "#fff7ed",
      "branches": [
        {
          "id": "net-vpc-hybrid",
          "code": "5A",
          "title": "VPC, Private Access & Hybrid Connectivity Suite",
          "badge": "Ch 14, 15, 16, 18, 19",
          "summary": "Virtual networks, private service bridges, NAT, firewalls, and physical/VPN hybrid links.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Multi-VPC: Cloud VPC · Shared VPC · VPC Network Peering · Network Connectivity Center (NCC Hub & Spoke)"
            },
            {
              "kind": "svc",
              "label": "📦 Private Bridges: Private Google Access (PGA) · Private Services Access (PSA) · Private Service Connect (PSC) · Direct VPC Egress"
            },
            {
              "kind": "svc",
              "label": "📦 Hybrid & Egress: HA VPN + Cloud Router · Dedicated / Partner / Cross-Cloud Interconnect · Cloud NAT · Secure Web Proxy · Cloud DNS"
            },
            {
              "kind": "svc",
              "label": "📦 Inside Network Intelligence Center: Connectivity Tests, Firewall Insights, Performance Dashboard & Network Topology"
            }
          ]
        },
        {
          "id": "net-lb-edge",
          "code": "5B",
          "title": "Cloud Load Balancing & Content Delivery Suite",
          "badge": "L7 & L4 + Edge Cache · Ch 17, 32",
          "summary": "Global Anycast and regional load balancers plus edge caching and TLS management.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 L7 HTTP(S): Global External ALB · Regional External ALB · Internal ALB · Cross-Region Internal ALB (+ Zonal/Serverless/Hybrid NEGs)"
            },
            {
              "kind": "svc",
              "label": "📦 L4 TCP/SSL/UDP: External/Regional Proxy NLB (TCP/SSL Proxy) · External/Internal Passthrough NLB (TCP/UDP Maglev)"
            },
            {
              "kind": "svc",
              "label": "📦 Edge Delivery: Cloud CDN (web/API/GCS caching) · Media CDN (streaming video scale) · Certificate Manager"
            }
          ]
        }
      ]
    },
    {
      "id": "u6-security",
      "code": "U6",
      "shortTitle": "Security, SCC, IAM, Keys & Compliance",
      "title": "6. Security, Identity & Governance Portfolio",
      "subtitle": "IAM & Zero-Trust + Security Command Center (incl. Model Armor!) + KMS/Secrets/DLP + Org Governance",
      "color": "#dc2626",
      "bgTint": "#fef2f2",
      "branches": [
        {
          "id": "sec-iam-zt",
          "code": "6A",
          "title": "Identity, Federation & Zero-Trust Access (BeyondCorp)",
          "badge": "Ch 04, 38, 51",
          "summary": "Human and workload authentication, least-privilege authorization, and VPN-less zero-trust proxies.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Identity: Cloud Identity · Cloud IAM (Predefined/Custom Roles, IAM Conditions, Deny Policies, Privileged Access Manager)"
            },
            {
              "kind": "svc",
              "label": "📦 Keyless Federation: Workload Identity Federation (AWS/Azure/GitHub/K8s -> GCP, NO SA keys!) & Workforce Identity Federation (Okta/AD)"
            },
            {
              "kind": "svc",
              "label": "📦 Zero-Trust Suite: Cloud IAP (HTTPS & SSH/RDP TCP proxy) + Access Context Manager + Chrome Enterprise Premium (Ch 51)"
            }
          ]
        },
        {
          "id": "sec-scc",
          "code": "6B",
          "title": "Security Command Center (SCC — What Is Included Inside!)",
          "badge": "Posture, Threats & AI Guardrails · Ch 37",
          "summary": "Google Cloud’s central security & risk platform — know every sub-module bundled inside SCC!",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Inside SCC Posture: Security Health Analytics (misconfigs/CIS benchmarks) + Attack Path Simulation + Toxic Combinations"
            },
            {
              "kind": "svc",
              "label": "📦 Inside SCC Threats: Event Threat Detection (logs) + Container Threat Detection + VM Threat Detection"
            },
            {
              "kind": "svc",
              "label": "📦 Model Armor (Ch 37 · L02 — under SCC!): Runtime LLM firewall blocking Prompt Injection, Jailbreaks, Malicious URLs & PII!"
            },
            {
              "kind": "svc",
              "label": "📦 Google SecOps (Chronicle SIEM + SOAR) & Mandiant Threat Intelligence"
            }
          ]
        },
        {
          "id": "sec-data-waf",
          "code": "6C",
          "title": "Encryption Keys, Secrets, PII Protection & Edge WAF",
          "badge": "Ch 33, 34, 35, 36",
          "summary": "Cryptographic keys, app secret vaults, PII de-identification, API perimeters, and web DDoS protection.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Cloud KMS (Ch 33): CMEK · Cloud HSM (FIPS 140-2/3 L3) · Cloud EKM (external keys) · Autokey (vs CSEK raw customer-supplied key)"
            },
            {
              "kind": "svc",
              "label": "📦 Secret Manager (Ch 36): Versioned vault with rotation hooks for DB passwords, API keys & TLS certs"
            },
            {
              "kind": "rename",
              "label": "🔄 Sensitive Data Protection (formerly Cloud DLP · Ch 34): Discovers, masks, redacts & format-preserving tokenizes 150+ PII types"
            },
            {
              "kind": "svc",
              "label": "📦 Perimeters & WAF: VPC Service Controls (stops BQ/GCS data exfiltration) · Cloud Armor (L7 OWASP WAF & DDoS) · reCAPTCHA Enterprise"
            }
          ]
        },
        {
          "id": "sec-gov",
          "code": "6D",
          "title": "Resource Governance, Sovereignty & Compliance",
          "badge": "Ch 02, 53",
          "summary": "Org hierarchy guardrails, sovereign compliance folders, and audit certifications.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Resource Manager (Org -> Folders -> Projects) + Organization Policy Service (guardrail constraints across hierarchy)"
            },
            {
              "kind": "svc",
              "label": "📦 Assured Workloads (FedRAMP/CJIS/IL4/EU sovereign controls) · Access Transparency & Access Approval (audit/approve Google support)"
            },
            {
              "kind": "svc",
              "label": "📦 Compliance Reports Manager (Ch 53): On-demand self-service downloads of Google’s SOC 1/2/3, ISO 27001 & PCI DSS reports!"
            }
          ]
        }
      ]
    },
    {
      "id": "u7-ops-devops",
      "code": "U7",
      "shortTitle": "Observability, DevOps, Migration & Billing",
      "title": "7. Observability, CI/CD, Migration, Backup & FinOps",
      "subtitle": "Cloud Observability Suite + CI/CD & IaC + Migration Center Suite + Backup/DR + Billing",
      "color": "#475569",
      "bgTint": "#f8fafc",
      "branches": [
        {
          "id": "ops-observability",
          "code": "7A",
          "title": "Cloud Observability Suite (formerly Stackdriver — What Is Inside!)",
          "badge": "Logs, Metrics & Traces · Ch 05",
          "summary": "Every telemetry, debugging, and SRE monitoring tool bundled under Google Cloud Observability.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Cloud Logging: Cloud Audit Logs (Admin Activity, Data Access, System Event, Policy Denied) + Log Router Sinks + Log Analytics"
            },
            {
              "kind": "svc",
              "label": "📦 Cloud Monitoring: Dashboards, Uptime Checks, SLO Burn-Rate Alerts, & Google Cloud Managed Service for Prometheus (GMP)"
            },
            {
              "kind": "svc",
              "label": "📦 APM Tools: Cloud Trace (distributed request latency) · Cloud Profiler (continuous CPU/RAM flamegraphs) · Error Reporting"
            },
            {
              "kind": "rename",
              "label": "🔄 Ops Agent (Ch 06 · L07): Unified OpenTelemetry + Fluent Bit VM agent (replaces legacy separate Monitoring & Logging agents!)"
            }
          ]
        },
        {
          "id": "ops-cicd-iac",
          "code": "7B",
          "title": "CI/CD Supply Chain, Developer Tools & IaC",
          "badge": "Build, Deploy & Terraform · Ch 09, 12, 13, 52",
          "summary": "Artifact storage, vulnerability scanning, continuous delivery, local emulators, and Infrastructure as Code.",
          "spines": [
            {
              "kind": "rename",
              "label": "🔄 Artifact Registry (Ch 09 — replaces deprecated Container Registry!): Docker/OS/language packages + Artifact Analysis CVE scan"
            },
            {
              "kind": "svc",
              "label": "📦 CI/CD Chain (Ch 12): Cloud Build (CI + Private Pools) -> Artifact Registry -> Binary Authorization (attestation) -> Cloud Deploy (CD)"
            },
            {
              "kind": "rename",
              "label": "🔄 Infrastructure Manager (managed Terraform — replaces deprecated Cloud Deployment Manager · Ch 13!)"
            },
            {
              "kind": "svc",
              "label": "📦 Dev Tooling: Cloud SDK (gcloud) · Cloud Shell · Cloud Workstations · GCP Service Emulators (Ch 52 local PubSub/Bigtable/Firestore/Spanner)"
            }
          ]
        },
        {
          "id": "ops-mig-dr-finops",
          "code": "7C",
          "title": "Migration Suite, Backup/DR & FinOps Billing",
          "badge": "Ch 02, 03, 47, 48, 49",
          "summary": "Discovery, VM/DB migration, immutable ransomware recovery, and cloud cost optimization.",
          "spines": [
            {
              "kind": "svc",
              "label": "📦 Migration Suite (Ch 49): Migration Center (Discovery/TCO) · Migrate to VMs · Migrate to Containers · Database Migration Service (DMS) · STS & Transfer Appliance"
            },
            {
              "kind": "svc",
              "label": "📦 Backup and DR Service (Ch 48): Immutable Backup Vaults + incremental-forever capture + instant virtual mount for GCE/GCVE/SAP/DBs"
            },
            {
              "kind": "svc",
              "label": "📦 FinOps & Billing (Ch 02, 03): Billing Export to BigQuery · Budgets & Alerts · Labels · CUDs & SUDs · Active Assist / Cloud Recommender"
            }
          ]
        }
      ]
    }
  ],
  "lenses": [
    {
      "id": "lens-ai",
      "label": "🤖 Vertex AI (Agent Platform) vs Pretrained vs Gemini Apps",
      "branchIds": [
        "ai-vertex-models",
        "ai-vertex-train-serve",
        "ai-vertex-mlops",
        "ai-pretrained-apis",
        "ai-turnkey-apps"
      ],
      "note": "Model Garden, AutoML, Colab Enterprise, Workbench, Endpoints, Batch Prediction, Feature Store, Pipelines, & Model Monitoring are ALL inside Vertex AI (Agent Platform, Ch 41). Document AI / Vision / Speech are separate Pre-trained APIs (Ch 40), and Gemini Enterprise / Cloud Assist / NotebookLM are turnkey AI apps (Ch 43–45)!"
    },
    {
      "id": "lens-scc",
      "label": "🛡️ What Is Inside Security Command Center (incl. Model Armor)?",
      "branchIds": [
        "sec-scc",
        "sec-data-waf"
      ],
      "note": "Security Health Analytics, Event/Container/VM Threat Detection, Attack Path Simulation, AND Model Armor (LLM prompt-injection & PII firewall, Ch 37 L02) live under Security Command Center — while Cloud Armor is the HTTP L7 edge WAF on Load Balancers!"
    },
    {
      "id": "lens-gke",
      "label": "☸️ What Is Inside GKE Enterprise (formerly Anthos)?",
      "branchIds": [
        "cmp-gke"
      ],
      "note": "GKE Enterprise bundles Fleets, Config Sync (GitOps), Policy Controller (OPA guardrails), Cloud Service Mesh (managed Istio), Config Connector (GCP via K8s CRDs), and GKE Distributed Cloud (VMware/Bare Metal/AWS/Azure)."
    },
    {
      "id": "lens-bq",
      "label": "📊 What Is Inside the BigQuery & Dataplex Ecosystem?",
      "branchIds": [
        "da-bigquery",
        "da-pipelines"
      ],
      "note": "BigQuery includes BQML, BI Engine, BQ Data Transfer Service, Dataform (SQL dbt), BigLake (open formats on GCS), and BigQuery Omni (AWS/Azure), governed by Dataplex Universal Catalog (which absorbed Data Catalog & Policy Tags)."
    },
    {
      "id": "lens-obs",
      "label": "🔭 What Is Inside Cloud Observability (formerly Stackdriver)?",
      "branchIds": [
        "ops-observability"
      ],
      "note": "Cloud Observability contains Cloud Logging (Audit Logs + Log Router Sinks + Log Analytics), Cloud Monitoring (Uptime Checks + SLOs + Managed Prometheus), Cloud Trace, Cloud Profiler, Error Reporting, and the unified Ops Agent."
    },
    {
      "id": "lens-renames",
      "label": "🔄 All Renamed & Deprecated Services (PCA v6.1 Exam Traps!)",
      "onlyKind": "rename",
      "branchIds": [
        "ai-turnkey-apps",
        "cmp-gke",
        "cmp-serverless",
        "da-bigquery",
        "da-pipelines",
        "sec-data-waf",
        "ops-observability",
        "ops-cicd-iac"
      ],
      "note": "Key PCA v6.1 Renames & Replacements: Agent Platform = Vertex AI · Gemini Enterprise = Agentspace · Cloud Run functions = Cloud Functions · Sensitive Data Protection = Cloud DLP · GKE Enterprise = Anthos · Dataplex Universal Catalog = Data Catalog · Artifact Registry replaces Container Registry · Infrastructure Manager (Terraform) replaces Deployment Manager · Ops Agent replaces separate Logging/Monitoring agents!"
    }
  ]
};
