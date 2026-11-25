window.PCA_CHEATSHEET_TABLES = [
  {
    "id": "data-migration",
    "domain": "Data & Migration",
    "icon": "📦",
    "title": "1. Bulk Data & Object Storage Migration Methods",
    "subtitle": "Transfer Appliance vs. Storage Transfer Service (On-Prem & Cloud) vs. gcloud storage / gsutil vs. BigQuery DTS",
    "decisionRule": "Calculate transfer time first: $T = \\frac{\\text{Data Size} \\times 8}{\\text{Available Bandwidth}}$. If $T > 1\\text{--}2\\text{ weeks}$ (or bandwidth is capped/air-gapped and $>40\\text{ TB}$), ship a **Transfer Appliance**; if $>1\\text{ TB}$ over $\\ge 1\\text{ Gbps}$ from on-prem POSIX, run **Storage Transfer Service (On-Prem)**; if AWS S3 / Azure Blob $\\rightarrow$ GCS, use **STS Cloud-to-Cloud**.",
    "mermaid": "flowchart TD\n      Start[\"Where is the source data?\"] --> SrcCloud[\"AWS S3 / Azure Blob / HTTP URLs\"]\n      Start --> SrcSaaS[\"SaaS Apps / Redshift / Teradata<br/>into BigQuery Warehouse\"]\n      Start --> SrcOnPrem[\"On-Premises File System (NFS / SMB)\"]\n      SrcCloud --> STSCloud[\"Storage Transfer Service<br/>(Agentless Cloud-to-Cloud)\"]\n      SrcSaaS --> BQDTS[\"BigQuery Data Transfer Service\"]\n      SrcOnPrem --> CheckBW{\"Enough bandwidth within<br/>deadline? (e.g. < 1-2 wks)\"}\n      CheckBW -->|\"No / Offline / > 40 TB slow link\"| TA[\"Transfer Appliance<br/>(40 TB or 300 TB Rack Hardware)\"]\n      CheckBW -->|\"Yes, > 1 TB & >= 1 Gbps\"| STSOnPrem[\"Storage Transfer Service On-Prem<br/>(Docker Agent Pool + Bandwidth Cap)\"]\n      CheckBW -->|\"Small < 1 TB / Ad-hoc CLI script\"| Gcloud[\"gcloud storage cp / gsutil -m\"]",
    "rows": [
      {
        "option": "gcloud storage cp / gsutil -m",
        "badge": "CLI / < 1 TB",
        "description": "Command-line upload/sync from local disks to Cloud Storage using multi-threading and **parallel composite uploads** (splits large files into chunks uploaded in parallel, then composes them).",
        "whenToChoose": [
          "Ad-hoc or scripted uploads **under ~1 TB** from a single server or CI/CD runner.",
          "Need quick CLI automation without deploying Docker transfer agents.",
          "Single multi-GB files needing parallel composite upload acceleration."
        ],
        "examTrap": "Fails at petabyte / hundreds-of-TB scale from on-premises: lacks centralized multi-machine agent pooling, UI progress monitoring, and enterprise bandwidth scheduling across a fleet.",
        "exampleQ": {
          "stem": "A DevOps script on a single Linux build server needs to upload 80 GB of nightly build artifacts to a Cloud Storage bucket as fast as possible using existing SDK tools.",
          "why": "`gcloud storage cp` automatically uses parallel composite uploads and multi-threading with zero extra infrastructure."
        }
      },
      {
        "option": "Storage Transfer Service (Cloud-to-Cloud)",
        "badge": "Agentless Managed",
        "description": "Fully serverless Google-managed service that pulls data directly from **AWS S3, Azure Blob Storage, HTTP/HTTPS URL lists**, or another GCS bucket on a one-time or recurring schedule.",
        "whenToChoose": [
          "Migrating or syncing **AWS S3 or Azure Blob** buckets to Cloud Storage.",
          "Multi-cloud architectures needing **scheduled incremental delta syncs** (metadata/checksum comparison).",
          "Copying between GCS buckets across regions/storage classes at scale."
        ],
        "examTrap": "Do NOT spin up Compute Engine VMs running `aws s3 sync` + `gsutil` to move S3 data to GCS — Cloud-to-Cloud STS is 100% agentless, serverless, and retries automatically.",
        "exampleQ": {
          "stem": "Your analytics team receives 15 TB of daily partner clickstream logs in an Amazon S3 bucket and wants only new/changed objects copied nightly to Cloud Storage with minimal operational overhead.",
          "why": "Storage Transfer Service natively reads S3 via IAM role/keys and transfers incremental deltas on a schedule without VMs."
        }
      },
      {
        "option": "Storage Transfer Service (On-Premises)",
        "badge": "Docker Agent Pool",
        "description": "Uses lightweight **Docker transfer agents** installed on on-premises VMs connected to a POSIX/NFS/SMB file system; scales horizontally with multiple agents, automatic retries, checksum validation, and **scheduled bandwidth throttling**.",
        "whenToChoose": [
          "Transferring **1 TB to hundreds of TB** from on-premises NAS/SAN when **high bandwidth ($\\ge 1\\text{ Gbps}$ / Interconnect)** IS available.",
          "Need **time-of-day bandwidth caps** so daytime production traffic on shared WAN links is not saturated.",
          "Ongoing phased cutover requiring repeated delta syncs after initial seed."
        ],
        "examTrap": "If the prompt gives a **100 Mbps link and 200 TB of data with a 2-week deadline**, STS over the network takes ~185 days — always check the bandwidth math before picking STS!",
        "exampleQ": {
          "stem": "A media company has a 10 Gbps Dedicated Interconnect with 40% spare capacity off-hours and needs to move 120 TB of NFS video archives to Cloud Storage within 10 days without impacting daytime WAN traffic.",
          "why": "STS On-Premises agents saturate spare 10 Gbps capacity (~30 hours raw) while enforcing business-hours bandwidth limits."
        }
      },
      {
        "option": "Transfer Appliance",
        "badge": "40 TB / 300 TB Hardware",
        "description": "Google ships a tamper-evident, **AES-256 CMEK-encrypted rackable hardware server** (`40 TB` or `300 TB` raw) to your data center; you copy data locally over 10/40 GbE and ship it back for upload into Cloud Storage.",
        "whenToChoose": [
          "Large datasets (**$>40\\text{ TB}$ to petabytes**) over **slow, congested, or expensive WAN links** where network transfer exceeds your deadline.",
          "Remote/air-gapped locations (ships, oil rigs, hospitals, factories) with intermittent or zero external connectivity.",
          "Initial cold baseline seed (often paired with STS later for final incremental delta!)."
        ],
        "examTrap": "Transfer Appliance is **ingest-only (On-Prem $\\rightarrow$ GCS)**, NOT for exporting cloud data back on-prem, and NOT suitable for real-time continuous replication (shipping takes days/weeks).",
        "exampleQ": {
          "stem": "A genomics lab has 500 TB of sequencing files on-premises, a 200 Mbps internet link shared with clinical staff, and a strict 30-day cloud migration deadline.",
          "why": "500 TB over 200 Mbps would take >230 days online; two 300 TB Transfer Appliances meet the 30-day deadline without touching clinic bandwidth."
        }
      },
      {
        "option": "BigQuery Data Transfer Service (BQ DTS)",
        "badge": "Warehouse Ingest",
        "description": "Managed, code-free scheduled ingestion directly into **BigQuery** from Google SaaS apps (Google Ads, Campaign Manager, YouTube, Play) and external warehouses/lakes (**Amazon Redshift, Teradata, Snowflake, S3**).",
        "whenToChoose": [
          "Destination is **BigQuery** (not raw Cloud Storage) and source is **Google Ads / YouTube / Teradata / Redshift / S3**.",
          "Analysts want scheduled, automated backfill & schema mapping without writing Apache Beam / Spark ETL."
        ],
        "examTrap": "BQ DTS does **complex transformations poorly** — if the prompt requires heavy row-level cleansing, PII redaction in-flight, or arbitrary streaming joins before loading BigQuery, choose **Cloud Dataflow**.",
        "exampleQ": {
          "stem": "Your marketing team wants Google Ads and Amazon Redshift campaign tables loaded into BigQuery every 24 hours with zero custom Python or Dataflow code.",
          "why": "BigQuery Data Transfer Service provides native no-code connectors and automated scheduled loads directly into BigQuery."
        }
      }
    ]
  },
  {
    "id": "api-gateways",
    "domain": "APIs & Integration",
    "icon": "🔌",
    "title": "2. API Management, Gateways & Enterprise Integration",
    "subtitle": "Apigee vs. API Gateway vs. Cloud Endpoints vs. Application Integration",
    "decisionRule": "Need **monetization, developer portal, complex OAuth/SAML/SOAP-to-REST transformation, or external partner analytics**? $\\rightarrow$ **Apigee**. Serverless backend (**Cloud Run / Functions**) needing simple auth & rate limits? $\\rightarrow$ **API Gateway**. Ultra-low-latency **gRPC / GKE Envoy sidecar**? $\\rightarrow$ **Cloud Endpoints**. Connecting **Salesforce / SAP / ERP** no-code? $\\rightarrow$ **Application Integration**.",
    "mermaid": "flowchart TD\n      Need[\"What is the primary integration / API goal?\"] --> ERP[\"Connect SaaS / ERP Systems<br/>(Salesforce, SAP, ServiceNow, DBs)\"]\n      Need --> API[\"Expose & Manage REST / gRPC APIs\"]\n      ERP --> AppInt[\"Application Integration +<br/>Integration Connectors\"]\n      API --> Monetize{\"Need Developer Portal, Monetization,<br/>SOAP/XML Transform, or Enterprise Analytics?\"}\n      Monetize -->|\"Yes\"| Apigee[\"Apigee API Management\"]\n      Monetize -->|\"No (Lightweight Auth / Quotas)\"| Backend{\"Where does the backend run?\"}\n      Backend -->|\"Serverless (Cloud Run / Functions / App Engine)\"| APIGW[\"API Gateway (Fully Managed)\"]\n      Backend -->|\"GKE / Compute Engine / gRPC Sidecar\"| Endpoints[\"Cloud Endpoints (ESPv2 Envoy Proxy)\"]",
    "rows": [
      {
        "option": "Apigee API Management",
        "badge": "Enterprise Full-Lifecycle",
        "description": "Enterprise API platform featuring **API proxies**, programmable traffic policies (Spike Arrest, Quota, OAuth 2.0, SAML, JWT), **SOAP/XML $\\leftrightarrow$ REST/JSON mediation**, **Developer Portal**, **API product monetization**, and deep business analytics (Cloud or Apigee Hybrid).",
        "whenToChoose": [
          "Exposing APIs to **external partners/customers** with **tiered monetization, billing, or a self-service Developer Portal**.",
          "**Legacy modernization (strangler fig pattern):** placing a stable facade in front of an on-prem SOAP/XML monolith while gradually migrating microservices behind it.",
          "Granular per-partner **Quota / Spike Arrest** policies backed by KVMs or external config."
        ],
        "examTrap": "Overkill and expensive if an internal team simply wants JWT validation in front of a single Cloud Run function with zero partner portal or payload transformation.",
        "exampleQ": {
          "stem": "A bank wants to publish open-banking REST APIs to third-party fintech partners with a developer onboarding portal, usage monetization tiers, and XML-to-JSON mediation in front of an on-prem mainframe.",
          "why": "Only Apigee provides native monetization, a developer portal, and legacy XML/SOAP-to-REST mediation policies."
        }
      },
      {
        "option": "API Gateway",
        "badge": "Serverless Managed",
        "description": "Fully managed, serverless OpenAPI 2.0 gateway managed by Google specifically designed to front **Cloud Run, Cloud Run functions, and App Engine** backends with API keys, Firebase Auth / Google ID tokens / JWTs, and basic quotas.",
        "whenToChoose": [
          "Fronting **serverless backends (Cloud Run / Cloud Run functions)** without deploying or managing proxy containers/VMs.",
          "Need quick **API key validation, JWT authentication, and per-consumer rate limits** with pay-per-call pricing."
        ],
        "examTrap": "`Modern Default`: Unlike Apigee, API Gateway has **NO monetization engine, NO customizable developer portal, and NO complex payload transformation (SOAP/XML)**.",
        "exampleQ": {
          "stem": "You built 6 Python Cloud Run functions and need a single managed HTTPS entry point that validates Firebase Auth JWTs and enforces per-key request quotas with zero proxy infrastructure to manage.",
          "why": "API Gateway natively fronts Cloud Run functions serverlessly with built-in JWT auth and quota enforcement."
        }
      },
      {
        "option": "Cloud Endpoints (ESPv2)",
        "badge": "Envoy Sidecar / gRPC",
        "description": "Distributed API management using the open-source **Extensible Service Proxy v2 (Envoy-based)** deployed as a **sidecar container** alongside workloads on **GKE, Compute Engine**, or self-managed Cloud Run; excels at **gRPC + JSON/HTTP transcoding**.",
        "whenToChoose": [
          "Internal or external **gRPC microservices on GKE or Compute Engine** needing **HTTP/JSON-to-gRPC transcoding**.",
          "Ultra-low-latency service-to-service API key / JWT validation with logging/metrics into Cloud Monitoring."
        ],
        "examTrap": "Requires **you** to deploy and manage the ESPv2 proxy container alongside your service (unlike API Gateway, which is 100% serverless/proxy-free).",
        "exampleQ": {
          "stem": "Your platform team runs high-throughput gRPC microservices on GKE and needs to accept both gRPC and REST/JSON requests while validating JWTs with sub-millisecond sidecar overhead.",
          "why": "Cloud Endpoints ESPv2 runs as an Envoy sidecar on GKE and natively transcodes REST/JSON into gRPC."
        }
      },
      {
        "option": "Application Integration + Integration Connectors",
        "badge": "No-Code SaaS / ERP",
        "description": "Visual, point-and-click **iPaaS workflow engine** with 100+ prebuilt **Integration Connectors** (Salesforce, SAP, ServiceNow, Workday, Oracle, Jira, Cloud SQL, Pub/Sub, BigQuery) plus visual data mapping and triggers.",
        "whenToChoose": [
          "Synchronizing business events across **enterprise SaaS / ERP / CRM apps (Salesforce, SAP, ServiceNow)** and GCP services with **low/no code**.",
          "Replacing brittle custom point-to-point webhook glue scripts with visual data transformers, retries, and approval steps."
        ],
        "examTrap": "Not for petabyte bulk ETL/stream windowing (use **Dataflow**) and not an external public REST API gateway for mobile apps (use **Apigee / API Gateway**).",
        "exampleQ": {
          "stem": "Whenever a new opportunity closes in Salesforce, your operations team wants an order record created in an on-premises SAP ERP system and a row written to BigQuery with minimal custom code.",
          "why": "Application Integration provides native Salesforce and SAP connectors with visual field mapping and error handling."
        }
      }
    ]
  },
  {
    "id": "hybrid-connectivity",
    "domain": "Networking & Hybrid",
    "icon": "🌐",
    "title": "3. Hybrid & Multi-Cloud Network Connectivity (On-Premises ↔ GCP)",
    "subtitle": "HA VPN vs. Dedicated Interconnect vs. Partner Interconnect vs. Cross-Cloud Interconnect vs. Direct Peering",
    "decisionRule": "Need **private RFC 1918 VPC access** quickly over internet ($\\le 3\\text{ Gbps/tunnel}$)? $\\rightarrow$ **HA VPN**. Need **10–200 Gbps** private SLA link and **at a Google colocation**? $\\rightarrow$ **Dedicated Interconnect**. Not at a Google colocation or need **50 Mbps–50 Gbps**? $\\rightarrow$ **Partner Interconnect**. Need encryption over Interconnect? $\\rightarrow$ **HA VPN over Interconnect** (or MACsec).",
    "mermaid": "flowchart TD\n      Goal[\"What do you need to reach from On-Prem?\"] --> PublicAPI[\"Only Public Google Workspace /<br/>YouTube / Public IPs (NO VPC)\"]\n      Goal --> PrivateVPC[\"Private RFC 1918 VPC Subnets\"]\n      PublicAPI --> Peering[\"Direct / Carrier Peering<br/>(NO GCP SLA · Outside VPC)\"]\n      PrivateVPC --> Speed{\"Bandwidth & Lead-Time Requirement?\"}\n      Speed -->|\"Immediate setup / <= 3 Gbps per tunnel / Encrypted\"| HAVPN[\"HA VPN (IPsec over Internet)<br/>2 Tunnels = 99.99% SLA\"]\n      Speed -->|\"High BW (>= 10 Gbps) + In Google Colocation\"| DedIC[\"Dedicated Interconnect<br/>(10G / 100G Links · up to 99.99% SLA)\"]\n      Speed -->|\"50 Mbps - 50 Gbps OR NOT in Google Colocation\"| PartIC[\"Partner Interconnect<br/>(via Carrier Service Provider)\"]\n      Speed -->|\"AWS / Azure / OCI <-> GCP 10G/100G\"| CCIC[\"Cross-Cloud Interconnect\"]",
    "rows": [
      {
        "option": "HA VPN (Cloud VPN)",
        "badge": "IPsec · 99.99% SLA",
        "description": "Managed IPsec VPN gateway with **2 interfaces (2 public IPs)** paired with **Cloud Router (dynamic BGP)**; delivers **99.99% SLA** when 2 (or 4) tunnels connect to redundant on-prem VPN gateways; ~1.5–3 Gbps per tunnel (scales via ECMP).",
        "whenToChoose": [
          "Need **rapid deployment (minutes, not weeks)** of encrypted private connectivity over the public internet.",
          "Moderate bandwidth (**$< 3\\text{--}10\\text{ Gbps}$**) or as an encrypted backup/encryption layer (**HA VPN over Cloud Interconnect**).",
          "Connecting branch offices or multi-cloud VPCs quickly with dynamic BGP failover."
        ],
        "examTrap": "`Modern Default`: **Classic VPN is deprecated (`99.9%` SLA, static routing issues)** — always choose **HA VPN + Cloud Router (BGP)**. Also remember internet latency/jitter still varies even though HA VPN has a 99.99% *availability* SLA.",
        "exampleQ": {
          "stem": "Your company must connect an on-premises data center to a GCP VPC within 48 hours with end-to-end IPsec encryption, dynamic route updates, and a 99.99% availability SLA for 800 Mbps of traffic.",
          "why": "HA VPN with two tunnels across redundant gateways and Cloud Router BGP achieves 99.99% SLA immediately over the internet."
        }
      },
      {
        "option": "Dedicated Interconnect",
        "badge": "10G / 100G Physical",
        "description": "Direct physical fiber cross-connect (`10 Gbps` × up to 8, or `100 Gbps` × up to 2) between your router and Google’s peering edge inside a **shared colocation facility**; VLAN attachments + Cloud Router BGP; lowest egress cost per GB.",
        "whenToChoose": [
          "Sustained **$\\ge 10\\text{ Gbps}$** hybrid traffic where your router is **physically present in (or can reach) a Google colocation facility**.",
          "Strict **low, predictable latency** and reduced egress cost at high data volumes.",
          "**99.99% SLA topology:** **4 links across 2 distinct metro Edge Availability Domains (EADs)** connected to 2 regions!"
        ],
        "examTrap": "1) Takes **weeks** to provision LOA-CFA cross-connects (never pick for \"tomorrow\" deadlines). 2) Traffic is **unencrypted by default** — if compliance mandates encryption in transit over Interconnect, layer **HA VPN over Interconnect** or **MACsec**!",
        "exampleQ": {
          "stem": "A financial firm colocated at an Equinix facility listed by Google needs 40 Gbps of low-latency private connectivity to GCP with a 99.99% SLA.",
          "why": "Redundant Dedicated Interconnect links across two metro Edge Availability Domains provide 40+ Gbps private bandwidth at 99.99% SLA."
        }
      },
      {
        "option": "Partner Interconnect",
        "badge": "50 Mbps – 50 Gbps",
        "description": "Private Layer-2 or Layer-3 connectivity into your VPC through a **supported telecommunications / NSP partner** when your data center cannot physically reach a Google colocation POP or needs sub-10G increments.",
        "whenToChoose": [
          "Your data center is **geographically far from any Google colocation facility**.",
          "Bandwidth needed is **between 50 Mbps and 10 Gbps** (e.g., 500 Mbps, 2 Gbps) where a full 10 Gbps Dedicated port is wasteful, yet public-internet VPN jitter is unacceptable."
        ],
        "examTrap": "Still requires carrier circuit provisioning lead time compared to HA VPN, and like Dedicated Interconnect, requires **HA VPN over Interconnect** if IPsec encryption is mandated.",
        "exampleQ": {
          "stem": "A manufacturing plant in a rural region far from Google POPs requires a guaranteed 2 Gbps private link with low jitter to a GCP VPC and already uses a Google-certified carrier MPLS network.",
          "why": "Partner Interconnect extends the existing carrier circuit privately into the VPC at 2 Gbps without needing colocation presence."
        }
      },
      {
        "option": "Cross-Cloud Interconnect",
        "badge": "GCP ↔ AWS / Azure / OCI",
        "description": "Google-managed dedicated physical `10 Gbps` or `100 Gbps` private link directly connecting your GCP VPC to **AWS Direct Connect, Azure ExpressRoute, OCI FastConnect, or Alibaba Cloud**.",
        "whenToChoose": [
          "High-bandwidth (**10G / 100G**), low-latency multi-cloud workloads spanning **GCP and AWS/Azure/OCI** without routing through an on-prem data center or third-party broker."
        ],
        "examTrap": "Only needed for **high-throughput multi-cloud ($ge 10\text{ Gbps}$)** — for low-volume AWS $\\leftrightarrow$ GCP encrypted traffic, **HA VPN** between AWS Transit Gateway and GCP HA VPN is far cheaper and faster to set up.",
        "exampleQ": {
          "stem": "An enterprise runs transactional databases on OCI and real-time analytics on BigQuery/GKE, requiring 20 Gbps of deterministic private throughput directly between the two clouds.",
          "why": "Cross-Cloud Interconnect establishes dedicated 10G/100G physical circuits directly between GCP and OCI."
        }
      },
      {
        "option": "Direct Peering / Carrier Peering",
        "badge": "⚠️ Classic Exam Distractor",
        "description": "BGP peering at Google edge POPs to exchange **public IP traffic** with Google Workspace, YouTube, and public Google APIs — **outside** of Cloud VPC.",
        "whenToChoose": [
          "**Almost NEVER on PCA!** Only valid if an ISP/enterprise specifically needs public BGP peering to **Google Workspace / YouTube** with zero private VPC RFC 1918 requirement."
        ],
        "examTrap": "`⚠️ #1 Networking Trap`: Direct/Carrier Peering **CANNOT reach private VPC RFC 1918 IPs**, is **not a GCP-recommended VPC connectivity product**, and carries **no GCP SLA**! Always eliminate it when the prompt mentions Compute Engine, GKE, or VPCs.",
        "exampleQ": {
          "stem": "Distractor Check: \"Use Direct Peering to connect your on-premises VMware servers privately to Compute Engine internal IPs.\" — Why is this WRONG?",
          "why": "Direct Peering only exchanges public Google edge prefixes and cannot route to private VPC subnets; use Dedicated/Partner Interconnect or HA VPN instead."
        }
      }
    ]
  },
  {
    "id": "private-vpc-connectors",
    "domain": "Networking & Hybrid",
    "icon": "🔒",
    "title": "4. Private API Access, PSC & Serverless VPC Connectors",
    "subtitle": "Private Google Access vs. Private Services Access vs. Private Service Connect vs. Direct VPC Egress vs. Serverless VPC Access vs. Cloud NAT",
    "decisionRule": "Private VM $\\rightarrow$ Google APIs? **PGA**. Private VM $\\rightarrow$ Internet? **Cloud NAT**. VPC $\\rightarrow$ Cloud SQL/AlloyDB/Memorystore via peering? **PSA** (or **PSC** to avoid transitive peering & overlapping IPs!). **Cloud Run $\\rightarrow$ VPC**? Prefer **Direct VPC Egress** (`Modern Default`) over legacy **Serverless VPC Access Connector**!",
    "mermaid": "flowchart TD\n      Src[\"What is initiating the private connection?\"] --> PrivVM[\"VM / GKE Node (No External IP)\"]\n      Src --> CloudRun[\"Cloud Run / Cloud Run functions (Gen 2)\"]\n      Src --> AppEng[\"App Engine Standard / Gen 1 Functions\"]\n      Src --> CrossVPC[\"Cross-VPC / GCVE / 3rd-Party SaaS /<br/>Transitive or Overlapping CIDRs\"]\n      PrivVM -->|\"To *.googleapis.com\"| PGA[\"Private Google Access (Subnet Toggle)\"]\n      PrivVM -->|\"To Public Internet (OS patches)\"| NAT[\"Cloud NAT (Outbound Only)\"]\n      PrivVM -->|\"To Cloud SQL / AlloyDB / Redis\"| PSA[\"Private Services Access (VPC Peering)<br/>or Private Service Connect\"]\n      CloudRun -->|\"To VPC Internal IPs\"| DirectEgress[\"Direct VPC Egress (No Connector VMs!)\"]\n      AppEng -->|\"To VPC Internal IPs\"| SVPCA[\"Serverless VPC Access Connector (/28)\"]\n      CrossVPC --> PSC[\"Private Service Connect (PSC)<br/>(Endpoints / Service Attachments)\"]",
    "rows": [
      {
        "option": "Private Google Access (PGA)",
        "badge": "Subnet Flag · Free",
        "description": "Subnet-level boolean setting allowing VMs and GKE nodes **with only internal RFC 1918 IPs (no external IPs)** to reach Google APIs & services (`*.googleapis.com`, `private.googleapis.com` `199.36.153.8/30`, or `restricted.googleapis.com` `199.36.153.4/30` for VPC-SC).",
        "whenToChoose": [
          "Private VMs or private GKE nodes must read/write **Cloud Storage, BigQuery, Artifact Registry, Pub/Sub, or Cloud Logging** without external IPs or Cloud NAT.",
          "On-premises hosts reaching Google APIs privately over VPN/Interconnect (via DNS routing to `private.googleapis.com` / `restricted.googleapis.com`)."
        ],
        "examTrap": "PGA ONLY reaches **Google APIs** — it does **NOT** let private VMs download `apt`/`yum`/`pip` packages from GitHub or Ubuntu mirrors on the internet (you need **Cloud NAT** or Artifact Registry remote repos for that!).",
        "exampleQ": {
          "stem": "You removed external IPs from all Compute Engine VMs for compliance, and now a startup script fails to pull objects from a Cloud Storage bucket.",
          "why": "Enabling Private Google Access on the subnet restores private access to Cloud Storage APIs without assigning external IPs or paying for Cloud NAT."
        }
      },
      {
        "option": "Private Services Access (PSA)",
        "badge": "Google Managed Peering",
        "description": "Allocates an internal `/16`–`/24` IP range in your VPC and creates an underlying **VPC Network Peering** connection to a Google-managed tenant project for **Cloud SQL, AlloyDB, Memorystore, Filestore, and Vertex AI**.",
        "whenToChoose": [
          "Standard single-VPC or Shared-VPC private IP connectivity to **Cloud SQL, AlloyDB, or Memorystore** when there are no transitive peering or CIDR overlap issues."
        ],
        "examTrap": "Because PSA uses **VPC Peering** under the hood, it is **NOT transitive**! Another peered VPC cannot reach a PSA-peered Cloud SQL instance directly without **Private Service Connect** or a proxy (and on-prem requires custom route advertisement on Cloud Router).",
        "exampleQ": {
          "stem": "Your GKE pods in a Shared VPC need private RFC 1918 IP access to a new Cloud SQL for PostgreSQL instance in the same project.",
          "why": "Private Services Access allocates an internal CIDR and peers the Cloud SQL producer network privately into your Shared VPC."
        }
      },
      {
        "option": "Private Service Connect (PSC)",
        "badge": "⚠️ PCA v6.1 Star · No Peering Limits",
        "description": "Service-oriented private networking using **PSC Endpoints** (forwarding rule assigning an IP from *your* consumer subnet) or **PSC Backends** (with Load Balancer) connecting to **Service Attachments** (Producer ILB, Google APIs, AlloyDB/Cloud SQL, GCVE, or 3rd-party SaaS like Snowflake/Datadog).",
        "whenToChoose": [
          "Connecting across **different VPCs, organizations, third-party SaaS vendors, or Google Cloud VMware Engine (GCVE)** privately.",
          "Consumer and producer VPCs have **overlapping RFC 1918 CIDR ranges** (PSC uses NAT at the attachment, so overlapping IPs work!).",
          "Avoiding **VPC Peering transitivity limits** or peering quota exhaustion across dozens of spoke VPCs."
        ],
        "examTrap": "`Modern Default`: PSC is **unidirectional (Consumer $\\rightarrow$ Producer)** — the producer cannot initiate unsolicited connections back into the consumer VPC! Also check Exam 1 Q41: GCVE connects to VPCs via **Private ServiceAccess / VPC Peering / Network Peering** rather than a single consumer PSC endpoint for bidirectional VMware migration.",
        "exampleQ": {
          "stem": "Twenty spoke VPCs (some with overlapping 10.0.0.0/16 subnets after an acquisition) all need private access to a central internal microservice hosted behind an Internal Load Balancer in a producer VPC.",
          "why": "Publishing the producer ILB via a PSC Service Attachment lets each consumer VPC create a local PSC Endpoint IP even when CIDRs overlap."
        }
      },
      {
        "option": "Direct VPC Egress (Cloud Run)",
        "badge": "⚡ Modern Default",
        "description": "Allows **Cloud Run services, Cloud Run jobs, and Cloud Run functions (2nd gen)** to send traffic directly into a VPC subnet by allocating internal IPs straight from the subnet — **no proxy connector VMs required**.",
        "whenToChoose": [
          "**Default choice on PCA v6.1** whenever **Cloud Run** needs high-throughput, low-latency private access to **AlloyDB, Cloud SQL, Memorystore, GKE, or internal VMs** (or routing Cloud Run outbound internet traffic through **Cloud NAT** for a static egress IP!).",
          "Minimizing cost and operational overhead (eliminates always-on `e2-micro` connector instances)."
        ],
        "examTrap": "`Modern Default`: Direct VPC Egress requires a larger subnet IP pool during rapid scale-out spikes (recommend `/26` or larger) and **only handles egress FROM Cloud Run TO the VPC** (not ingress into Cloud Run — use Internal ALB or Serverless NEG for ingress).",
        "exampleQ": {
          "stem": "A Cloud Run microservice must query an AlloyDB private IP with minimal latency and route outbound webhook calls through Cloud NAT using a static allowlisted IP, without paying for idle proxy VMs.",
          "why": "Direct VPC Egress attaches Cloud Run directly to the VPC subnet (and Cloud NAT) with lower latency and zero connector VM cost."
        }
      },
      {
        "option": "Serverless VPC Access Connector",
        "badge": "/28 Connector VMs",
        "description": "Deploys managed Compute Engine connector instances inside a dedicated **`/28` VPC subnet** to bridge serverless runtimes into a VPC.",
        "whenToChoose": [
          "**App Engine Standard** or **Cloud Functions (1st gen)** needing private access to Memorystore / Cloud SQL / internal VMs (since App Engine Standard does not support Direct VPC Egress).",
          "Scenarios explicitly requiring legacy GCE **network tags** on connector VMs."
        ],
        "examTrap": "Requires a **dedicated unused `/28` subnet** (cannot share an existing VM subnet!), incurs **24/7 instance charges** even when serverless traffic scales to zero, and caps throughput per connector.",
        "exampleQ": {
          "stem": "An App Engine Standard Python app needs to read session state from a Memorystore for Redis instance on a private VPC IP.",
          "why": "App Engine Standard requires a Serverless VPC Access Connector in a dedicated /28 subnet to reach private VPC IPs."
        }
      },
      {
        "option": "Cloud NAT",
        "badge": "Outbound SNAT Only",
        "description": "Software-defined, regional, proxy-less **source NAT** (configured on **Cloud Router**) enabling private VMs, private GKE clusters, and Direct-VPC-Egress Cloud Run services to initiate **outbound internet connections** (or Private/Hybrid NAT).",
        "whenToChoose": [
          "Private VMs or private GKE nodes need to download **external OS patches, third-party packages, or call external partner webhooks** (optionally from a **static allowlisted NAT IP**)."
        ],
        "examTrap": "Cloud NAT is **strictly outbound-initiated** — external internet clients **CANNOT** initiate unsolicited inbound connections to VMs through Cloud NAT (use a **Load Balancer** or **IAP** for inbound access!).",
        "exampleQ": {
          "stem": "A third-party payment gateway requires all outbound HTTPS API calls from your private GKE Autopilot pods to originate from two static public IPv4 addresses.",
          "why": "Cloud NAT with manual static external IP assignment translates outbound pod traffic to the exact allowlisted IPs."
        }
      }
    ]
  },
  {
    "id": "multi-vpc-design",
    "domain": "Networking & Hybrid",
    "icon": "🌍",
    "title": "5. Multi-Project & Multi-VPC Topologies",
    "subtitle": "Shared VPC vs. VPC Network Peering vs. Network Connectivity Center (NCC)",
    "decisionRule": "Same GCP Organization with centralized SecOps/NetOps team? $\\rightarrow$ **Shared VPC** (default enterprise best practice!). Autonomous teams, **different GCP Organizations**, or quick peer-to-peer link? $\\rightarrow$ **VPC Peering** (watch out: non-transitive!). Hub-and-spoke across **hybrid links + many VPCs**? $\\rightarrow$ **Network Connectivity Center**.",
    "mermaid": "flowchart TD\n      Org{\"Are projects inside the<br/>same GCP Organization?\"} -->|\"No (Cross-Org / Partner)\"| CrossOrg{\"Overlapping CIDRs or<br/>Service-Only Access?\"}\n      CrossOrg -->|\"Yes\"| PSC2[\"Private Service Connect\"]\n      CrossOrg -->|\"No (Full Subnet Routing)\"| Peer[\"VPC Network Peering<br/>(Non-Transitive!)\"]\n      Org -->|\"Yes\"| Admin{\"Centralized Network Admin<br/>controlling subnets/firewalls?\"}\n      Admin -->|\"Yes (Enterprise Standard)\"| SVPC[\"Shared VPC<br/>(Host Project + Service Projects)\"]\n      Admin -->|\"Many Autonomous VPCs +<br/>Hybrid Transit Hub\"| NCC[\"Network Connectivity Center<br/>(Hub & Spoke)\"]",
    "rows": [
      {
        "option": "Shared VPC",
        "badge": "Enterprise Standard",
        "description": "Designates one **Host Project** owning subnets, routes, firewall rules, and VPN/Interconnect attachments, while multiple **Service Projects** (within the **same GCP Organization**) deploy VMs/GKE/Cloud Run into delegated subnets via `compute.networkUser`.",
        "whenToChoose": [
          "Enterprise separation of duties: **central Network/Security team** manages firewalls, CIDRs, and hybrid links while **application teams** own isolated billing/IAM projects.",
          "Multiple projects must share **one set of HA VPN / Dedicated Interconnect attachments** transitively without duplicating circuits."
        ],
        "examTrap": "Cannot span across **two different GCP Organizations** (unless migrated into one Org), and **all subnets inside the Shared VPC must have unique non-overlapping CIDRs**.",
        "exampleQ": {
          "stem": "An enterprise has 15 microservice teams, each needing its own GCP project for billing and IAM isolation, while a central NetOps team enforces all firewall policies and shares one Dedicated Interconnect.",
          "why": "Shared VPC centralizes subnets, firewalls, and Interconnect VLAN attachments in one Host Project while keeping workloads in separate Service Projects."
        }
      },
      {
        "option": "VPC Network Peering",
        "badge": "Decentralized · Non-Transitive",
        "description": "Direct control-plane route exchange between two independent VPCs (**same or different GCP Organizations**) at full Google backbone line rate with zero bandwidth bottleneck or extra per-GB peering charge within the same zone.",
        "whenToChoose": [
          "Connecting two VPCs across **different GCP Organizations** (e.g., after an M&A acquisition before Org consolidation) with non-overlapping IPs.",
          "Two completely autonomous teams manage their own VPC networks and firewall rules independently."
        ],
        "examTrap": "**NON-TRANSITIVE!** If `VPC-A` peers with `VPC-B`, and `VPC-B` peers with `VPC-C` (or has Cloud VPN/Interconnect to on-prem), **`VPC-A` CANNOT reach `VPC-C` or on-prem through `VPC-B`**! Also fails if ANY subnet CIDR overlaps.",
        "exampleQ": {
          "stem": "Your company acquired a startup in a separate Google Cloud Organization and needs low-latency private RFC 1918 connectivity between your analytics VPC (10.10.0.0/16) and their app VPC (10.20.0.0/16).",
          "why": "VPC Network Peering works across distinct GCP Organizations at full backbone speed with no overlapping IPs."
        }
      },
      {
        "option": "Network Connectivity Center (NCC)",
        "badge": "Global Hub & Spoke",
        "description": "Centralized management **Hub** connecting **VPC spokes** (star or mesh topology), **Hybrid spokes** (HA VPN, Interconnect VLANs, SD-WAN Router Appliances), and Producer VPC spokes at scale.",
        "whenToChoose": [
          "Large enterprise **hub-and-spoke** topologies needing **hundreds of VPC spokes** or **site-to-site / hybrid-to-VPC transit** managed from a single control plane without full-mesh VPC peering limits."
        ],
        "examTrap": "VPC spokes attached to the same NCC hub still require **non-overlapping subnet CIDRs** (if CIDRs overlap, use **Private Service Connect** or **Cloud NAT / Hybrid NAT**!).",
        "exampleQ": {
          "stem": "A global retailer has 60 independent VPCs across 4 regions plus 8 regional HA VPN spokes and wants any spoke VPC to communicate via a central hub without managing 1,770 full-mesh VPC peerings.",
          "why": "Network Connectivity Center acts as a scalable central hub bridging both VPC spokes and hybrid VPN/Interconnect spokes."
        }
      }
    ]
  },
  {
    "id": "load-balancing",
    "domain": "Networking & Hybrid",
    "icon": "⚖️",
    "title": "6. Cloud Load Balancing Decision Matrix",
    "subtitle": "Global External ALB vs. Regional ALB vs. Proxy NLB (TCP/SSL) vs. Passthrough NLB (External/Internal)",
    "decisionRule": "HTTP/HTTPS needing **Anycast single IP, URL path routing, Cloud CDN, or Cloud Armor**? $\\rightarrow$ **Global External ALB**. HTTP/HTTPS with **strict single-region TLS/compliance residency**? $\\rightarrow$ **Regional External ALB**. Non-HTTP TCP needing **global Anycast + SSL offload**? $\\rightarrow$ **External Proxy NLB**. Need **UDP, non-standard ports, or preserve client IP**? $\\rightarrow$ **Passthrough NLB**.",
    "mermaid": "flowchart TD\n      Proto{\"Traffic Protocol?\"} -->|\"HTTP / HTTPS / gRPC / WebSockets\"| L7{\"Global Anycast + CDN,<br/>or Single-Region / Internal?\"}\n      Proto -->|\"TCP / SSL / UDP / Raw IP\"| L4{\"Need UDP, All Ports, or<br/>Preserve Client Source IP?\"}\n      L7 -->|\"Public Global Anycast + CDN + Armor\"| GALB[\"Global External Application LB (L7)\"]\n      L7 -->|\"Public Strict Regional Data Residency\"| RALB[\"Regional External Application LB (L7)\"]\n      L7 -->|\"Private RFC 1918 Microservices / Hybrid\"| IALB[\"Internal Application LB (L7)\"]\n      L4 -->|\"No (Global TCP/TLS + Edge SSL Offload)\"| ProxyNLB[\"External Proxy Network LB<br/>(TCP Proxy / SSL Proxy)\"]\n      L4 -->|\"Yes (UDP / Preserve IP / Next-Hop NVA)\"| PassNLB[\"Passthrough Network LB<br/>(External or Internal L4)\"]",
    "rows": [
      {
        "option": "Global External Application LB (L7)",
        "badge": "Global Anycast · CDN + Armor",
        "description": "Envoy/GFE-powered global Layer-7 HTTP(S) proxy with a **single global Anycast IP** (Premium Network Tier), **host & URL path-based routing** (`/api` $\\rightarrow$ Cloud Run, `/static` $\\rightarrow$ GCS bucket), **Cloud CDN**, and **Cloud Armor WAF**.",
        "whenToChoose": [
          "Global web/API apps routing users to the **closest healthy region** automatically with multi-region failover.",
          "Combining **GCE MIGs, GKE Container-Native NEGs, Cloud Run Serverless NEGs, and Cloud Storage buckets** behind one domain/IP.",
          "Enabling **Cloud CDN** edge caching and **Cloud Armor** DDoS/WAF rules."
        ],
        "examTrap": "Requires **Premium Network Tier** for global Anycast multi-region routing! Also terminates TLS at the closest global Google POP (so if strict compliance forbids TLS termination outside e.g. `europe-west3`, pick **Regional External ALB** instead!).",
        "exampleQ": {
          "stem": "You want `shop.example.com/images/*` served from a Cloud Storage bucket via Cloud CDN and `shop.example.com/checkout/*` routed to Cloud Run services in `us-central1` and `europe-west1` behind Cloud Armor.",
          "why": "Global External Application LB supports URL map path routing across Cloud Storage backend buckets and multi-region Serverless NEGs."
        }
      },
      {
        "option": "Regional External / Internal Application LB (L7)",
        "badge": "Regional Residency / East-West",
        "description": " Envoy-based Layer-7 HTTP(S) load balancer scoped strictly to **one GCP region** (External for jurisdictional compliance / Standard Tier; Internal for RFC 1918 microservice-to-microservice or on-prem hybrid L7 routing).",
        "whenToChoose": [
          "**Strict regulatory data residency** requiring TLS termination and L7 inspection to never leave a specific country/region.",
          "**Internal Application LB:** private East-West L7 path/header routing, Envoy traffic splitting/canary, or exposing internal Cloud Run/GKE services to on-premises via VPN/Interconnect."
        ],
        "examTrap": "Regional External ALB has a regional IP (no global cross-region automatic Anycast failover without DNS routing policies).",
        "exampleQ": {
          "stem": "A German healthcare portal requires L7 path routing and WAF protection, with a legal mandate that TLS termination and packet inspection occur exclusively inside `europe-west3` (Frankfurt).",
          "why": "Regional External Application Load Balancer keeps TLS termination and Envoy L7 proxy processing strictly inside Frankfurt."
        }
      },
      {
        "option": "External Proxy Network LB (SSL / TCP Proxy)",
        "badge": "Global L4 Proxy",
        "description": "Global (or regional) Layer-4 **reverse proxy** load balancer for **non-HTTP TCP/TLS protocols** (MQTT over TLS, IMAPS, custom binary TCP) terminating TCP/SSL at Google edge POPs and routing to the closest region.",
        "whenToChoose": [
          "**IoT MQTT or custom TCP/TLS** workloads needing a **single Global Anycast IP**, cross-region failover, and **managed Google SSL certificate offload**."
        ],
        "examTrap": "Does **NOT support UDP** and rewrites client source IP at the proxy (use **PROXY protocol header** if backends need the original client IP, or **Passthrough NLB** for UDP).",
        "exampleQ": {
          "stem": "Millions of global smart-meter IoT devices connect over TLS-encrypted MQTT (port 8883) and must automatically route to the closest healthy GCE MIG across 3 continents using one IP.",
          "why": "External SSL Proxy Network Load Balancer provides a global Anycast IP and offloads TLS at the edge for non-HTTP TCP/MQTT traffic."
        }
      },
      {
        "option": "Passthrough Network LB (External & Internal L4)",
        "badge": "UDP · Preserves Client IP",
        "description": "Maglev/Andromeda software-defined **non-proxying** regional Layer-4 load balancer supporting **TCP, UDP, ESP, GRE, ICMP** on **any or all ports**, delivering packets directly to backend VMs with the **original client source IP intact**.",
        "whenToChoose": [
          "**UDP workloads** (gaming servers, VoIP/WebRTC, DNS, syslog) or protocols needing **all ports**.",
          "Legacy apps requiring **end-to-end TLS termination directly on the VM** or **unmodified client source IP** at packet level.",
          "**Internal Passthrough NLB as Custom Route Next-Hop:** HA active-active firewall / NVA virtual appliances inspecting traffic between VPCs!"
        ],
        "examTrap": "**Strictly regional** (cannot route to backends in another region) and **cannot terminate SSL/TLS** or route by URL path (it is pure Layer-4 packet forwarding).",
        "exampleQ": {
          "stem": "A multiplayer gaming studio runs real-time UDP match servers on regional Compute Engine MIGs and needs ultra-low-latency load balancing that preserves each player’s source IP.",
          "why": "External Passthrough Network Load Balancer natively handles UDP at line rate while preserving client source IPs."
        }
      }
    ]
  },
  {
    "id": "relational-databases",
    "domain": "Databases & Storage",
    "icon": "🗄️",
    "title": "7. Managed Relational (SQL) Databases",
    "subtitle": "Cloud SQL (Enterprise vs. Plus) vs. AlloyDB (+ Omni) vs. Cloud Spanner vs. Bare Metal Oracle",
    "decisionRule": "Standard MySQL / Postgres / SQL Server regional RDBMS ($\\le 64\\text{ TB}$ Enterprise or $\\le 128\\text{ TB}$ / `99.99%` Enterprise Plus)? $\\rightarrow$ **Cloud SQL**. Demanding **PostgreSQL** needing **4× OLTP + 100× HTAP Columnar + `pgvector` AI** (or **AlloyDB Omni** on-prem)? $\\rightarrow$ **AlloyDB**. Need **global multi-region active-active writes, horizontal write sharding, or `99.999%` SLA**? $\\rightarrow$ **Cloud Spanner**. Unrefactorable **Oracle RAC**? $\\rightarrow$ **Bare Metal Solution**.",
    "mermaid": "flowchart TD\n      Engine{\"Relational Engine & Scale?\"} -->|\"Oracle RAC / Strict Oracle License<br/>(Zero Refactor)\"| BMS[\"Bare Metal Solution for Oracle<br/>(<2ms Partner Interconnect)\"]\n      Engine -->|\"MySQL or SQL Server\"| CSQLTier{\"Need 99.99% SLA, <10s Maint,<br/>Data Cache, or up to 128 TB?\"}\n      CSQLTier -->|\"No (Standard <= 64 TB, 99.95% SLA)\"| CSQL[\"Cloud SQL Enterprise\"]\n      CSQLTier -->|\"Yes\"| CSQLP[\"Cloud SQL Enterprise Plus\"]\n      Engine -->|\"Global Multi-Region Simultaneous Writes /<br/>99.999% SLA / Horizontal Write Scale\"| Spanner[\"Cloud Spanner<br/>(GoogleSQL or PG Dialect + TrueTime)\"]\n      Engine -->|\"PostgreSQL Compatible\"| PGScale{\"4x OLTP + 100x HTAP Columnar +<br/>pgvector AI or On-Prem Omni?\"}\n      PGScale -->|\"No (Standard Regional PG)\"| CSQL\n      PGScale -->|\"Yes\"| Alloy[\"AlloyDB for PostgreSQL<br/>(+ AlloyDB Omni for On-Prem/Edge)\"]",
    "rows": [
      {
        "option": "Cloud SQL (Enterprise & Enterprise Plus — MySQL, PostgreSQL, SQL Server)",
        "badge": "Regional RDBMS · 64–128 TB · 99.95%–99.99% SLA",
        "description": "Fully managed **single-primary regional** RDBMS. **Enterprise** tier: up to `64 TB`, `99.95%` HA SLA (synchronous standby in a 2nd zone, ~60–120s failover), 7-day PITR. **Enterprise Plus** tier: up to **`128 TB`**, **`99.99%` SLA** (inclusive of `<10s` planned maintenance!), local SSD **Data Cache** (`3×` read perf), and 35-day PITR.",
        "whenToChoose": [
          "Lift-and-shift of **MySQL, PostgreSQL, or Microsoft SQL Server** workloads with **single-region write volume** (`vertical` primary write scaling + `horizontal` Read Replicas).",
          "Pick **Enterprise Plus** when MySQL/SQL Server needs **`99.99%` availability**, near-zero-downtime maintenance, or `64–128 TB` capacity.",
          "Always connect via **Cloud SQL Auth Proxy** (IAM + mTLS 1.3 dynamic ephemeral certs, zero static IP allowlists)."
        ],
        "examTrap": "**Read Replicas scale READS or provide async cross-region DR promotion — NOT synchronous HA failover!** (`⚠️ Exam 2 Q40`: Regional HA uses a **synchronous zonal standby**, whereas Read Replicas are **asynchronous** and can lag!). Also **cannot scale writes horizontally** across nodes or regions.",
        "exampleQ": {
          "stem": "You are migrating a 2 TB on-premises Microsoft SQL Server ERP database to GCP requiring synchronous single-region automatic failover (`RPO = 0`) and automated daily backups.",
          "why": "Cloud SQL for SQL Server with Regional High Availability provides synchronous cross-zone standby (`RPO = 0`) with zero app changes."
        }
      },
      {
        "option": "AlloyDB for PostgreSQL (+ AlloyDB Omni)",
        "badge": "Enterprise PG · <= 128 TB · 99.99% SLA · HTAP + AI",
        "description": "100% PostgreSQL-compatible cloud-native engine decoupling compute from Google `Colossus` storage (`<= 128 TB` auto-scaling): **4× faster OLTP** than standard PG, **100× faster analytics** via in-memory **Columnar Engine**, **`99.99%` SLA** (inclusive of maintenance, `<60s` failover), elastic **Read Pool** nodes, `ScaNN` **`pgvector` + Vertex AI**, plus **AlloyDB Omni** (run containerized on-premises / edge / AWS / Azure).",
        "whenToChoose": [
          "Modernizing **legacy Oracle / commercial RDBMS** to PostgreSQL needing `99.99%` SLA, `<60s` recovery, and enterprise throughput.",
          "**HTAP (Hybrid Transactional + Analytical):** Running real-time operational BI queries directly on live Postgres data without ETL delay.",
          "**GenAI RAG / Vector Search** on operational rows (`pgvector` + `google_ml_integration`), OR **strict on-prem data sovereignty** using **AlloyDB Omni**."
        ],
        "examTrap": "**PostgreSQL-only** (never pick for MySQL or SQL Server without migration!), and **writes still go to ONE regional primary instance** (Cross-Region Secondary Clusters are *read-only / DR promotion*, NOT active-active multi-region writes — pick **Cloud Spanner** for simultaneous multi-region writes!).",
        "exampleQ": {
          "stem": "A fintech team is migrating off Oracle to a PostgreSQL-compatible managed database that supports 99.99% availability, fast real-time analytical reporting on live tables, and `pgvector` similarity search for an AI assistant.",
          "why": "AlloyDB is 100% PostgreSQL-compatible with a 99.99% SLA, built-in Columnar Engine for analytics, and Vertex AI vector integration."
        }
      },
      {
        "option": "Cloud Spanner",
        "badge": "Global Horizontal SQL · ∞ PB · 99.999% SLA",
        "description": "Globally distributed, **horizontally write-scalable** relational database combining **ACID transactions, external strong consistency (`TrueTime`)**, SQL (**GoogleSQL** or **PostgreSQL interface**), granular sizing from **`100 Processing Units` (`0.1` node)** to petabytes, **Interleaved parent-child tables**, and **`99.999%` SLA** (multi-region; `99.99%` regional).",
        "whenToChoose": [
          "**Simultaneous active-active multi-region writes** across continents/regions with zero replication lag conflicts and strong global consistency.",
          "Relational workloads outgrowing a single primary node’s write IOPS/CPU (`> 10k–100k+ writes/sec` or `> 128 TB` relational data).",
          "Mission-critical **`99.999%` (\"five nines\" = `< 5.26 min/year`) availability** for financial ledgers, global inventory, payments, or gaming state."
        ],
        "examTrap": "1) Overkill/costly if a single-region `< 64 TB` MySQL/Postgres DB suffices (pick **Cloud SQL**). 2) **NEVER use monotonically increasing sequential integer PKs** (`AUTO_INCREMENT` `1, 2, 3...` or leading current timestamp) — causes single-split write hotspotting! Use **UUIDv4**, bit-reversed sequences, or hash-prefixed composite keys.",
        "exampleQ": {
          "stem": "A global payments processor requires an ACID relational database serving active reads and writes across North America, Europe, and Asia with strong consistency and 99.999% availability.",
          "why": "Cloud Spanner multi-region configuration is the only GCP relational database providing 99.999% SLA and globally strongly consistent horizontal writes."
        }
      },
      {
        "option": "Bare Metal Solution (BMS) for Oracle",
        "badge": "Oracle RAC · Certified Dedicated Hardware",
        "description": "Dedicated, single-tenant certified x86 physical servers in a Google-managed regional extension facility connected to your VPC via **`< 2 ms` Partner Interconnect**, supporting **Oracle RAC, custom kernel modules, SAN storage, and Bring-Your-Own-License (BYOL)** without hypervisor overhead.",
        "whenToChoose": [
          "Legacy **Oracle Real Application Clusters (Oracle RAC)** or specialized commercial DBs that **cannot run in standard cloud VMs** and **cannot be refactored** to AlloyDB / Cloud Spanner within the project timeline.",
          "Strict per-core **Oracle licensing constraints** where running on multi-tenant GCE hypervisors is contractually prohibitive."
        ],
        "examTrap": "You manage OS/DB patching and backups yourself (not a fully managed PaaS!). If the customer *wants* to modernize off Oracle onto managed PostgreSQL, pick **Database Migration Service (DMS) + AlloyDB** instead!",
        "exampleQ": {
          "stem": "An enterprise must retire its data center in 4 months and move a mission-critical 40 TB Oracle RAC database with strict per-physical-core licensing to Google Cloud with zero application code refactoring.",
          "why": "Bare Metal Solution provides Oracle-certified dedicated physical servers supporting Oracle RAC and BYOL right next to GCP (<2 ms latency)."
        }
      }
    ]
  },
  {
    "id": "nosql-analytics-storage",
    "domain": "Databases & Storage",
    "icon": "⚡",
    "title": "8. NoSQL, Caching, Object Storage & Data Warehousing",
    "subtitle": "Firestore vs. Cloud Bigtable vs. BigQuery vs. Memorystore vs. Cloud Storage",
    "decisionRule": "Mobile/Web JSON docs + real-time offline sync? $\\rightarrow$ **Firestore**. High-velocity **IoT / time-series / FinTech $>10\\text{k QPS}$ sub-10ms** wide-column? $\\rightarrow$ **Bigtable**. Petabyte **SQL OLAP analytics & ML**? $\\rightarrow$ **BigQuery**. Sub-ms **in-memory cache/session**? $\\rightarrow$ **Memorystore**. Blobs/backups/WORM lakes? $\\rightarrow$ **Cloud Storage**.",
    "mermaid": "flowchart TD\n      Data[\"Data Shape & Access Pattern?\"] -->|\"Blobs, Files, Backups, Static Web\"| GCS[\"Cloud Storage<br/>(Standard / Autoclass / Archive)\"]\n      Data -->|\"Sub-ms Volatile Cache / Sessions\"| Mem[\"Memorystore (Redis / Valkey / Memcached)\"]\n      Data -->|\"SQL Analytics / BI / Petabyte OLAP\"| BQ[\"BigQuery (Partitioned + Clustered)\"]\n      Data -->|\"Operational NoSQL\"| NoSQL{\"Throughput & Client Pattern?\"}\n      NoSQL -->|\"JSON Docs, Mobile/Web SDKs,<br/>Scales to Zero, ACID\"| FS[\"Firestore (Native Mode)\"]\n      NoSQL -->|\"Massive Write Stream (>10k-1M QPS),<br/>Sub-10ms IoT / Time-Series / HBase\"| BT[\"Cloud Bigtable (Wide-Column)\"]",
    "rows": [
      {
        "option": "Firestore (Native Mode)",
        "badge": "Serverless Document DB",
        "description": "Serverless hierarchical **Collection $\\rightarrow$ Document $\\rightarrow$ Subcollection** JSON-like database (`99.999%` multi-region SLA), ACID multi-document transactions, real-time client listeners, **mobile/web offline sync**, and automatic **scale-to-zero**.",
        "whenToChoose": [
          "**Mobile, web, gaming player profiles, product catalogs, or chat/collaborative state** needing direct client SDK real-time updates & offline mode.",
          "Serverless microservices wanting zero-ops NoSQL that scales down to `\\$0` when idle."
        ],
        "examTrap": "1 MB max document size; avoid sequential timestamp-prefixed document IDs at high write rates (`500/50/5` hotspot rule); NOT designed for millions of raw IoT sensor writes/sec (pick **Bigtable**) or complex SQL `JOIN` aggregations (pick **BigQuery / Spanner**).",
        "exampleQ": {
          "stem": "You are building a mobile field-inspection app that must work offline in basements, automatically sync JSON inspection forms when connectivity returns, and push real-time status updates to supervisors.",
          "why": "Firestore Native Mode provides built-in iOS/Android/Web offline persistence and real-time snapshot listeners out of the box."
        }
      },
      {
        "option": "Cloud Bigtable",
        "badge": "Sub-10ms Wide-Column · HBase",
        "description": "Petabyte-scale, sparsely populated **wide-column key-value store** compatible with **Apache HBase API**; linear horizontal throughput scaling (`~10,000 QPS` per node) at consistent **single-digit millisecond** read/write latency.",
        "whenToChoose": [
          "High-throughput **IoT telemetry, time-series metrics, FinTech market ticks, AdTech bidding, or personalization graphs** (`> 1 TB` and `> 10,000 writes/sec`).",
          "Lift-and-shift from on-premises **Apache HBase** or Cassandra-like wide-column workloads.",
          "**Row-Key Golden Rule:** Prefix with high-cardinality entity ID + reverse/bucketed timestamp (`vehicle_id#reverse_ts`)!"
        ],
        "examTrap": "1) **NEVER start a Bigtable row key with a raw timestamp** (`20261120...#device_id`) — all current writes hammer one tablet node causing severe **hotspotting**! 2) No multi-row ACID transactions, no SQL joins, and no secondary indexes (queries scan by **row-key prefix** only).",
        "exampleQ": {
          "stem": "100,000 connected delivery trucks stream GPS & engine telemetry every second (100k writes/sec), and dispatchers query the latest 100 readings for a specific `vehicle_id` in under 10 ms.",
          "why": "Bigtable handles 100k+ writes/sec at sub-10ms latency using row key `vehicle_id#reverse_timestamp` to avoid hotspotting."
        }
      },
      {
        "option": "BigQuery",
        "badge": "Serverless Petabyte OLAP",
        "description": "Serverless, columnar enterprise **data warehouse** decoupling compute (`Slots` / Editions) from storage (`Colossus`), supporting **Time-Unit/Ingestion Partitioning + Clustering**, **BigQuery ML**, **Authorized Views**, **Row/Column-Level Security (Policy Tags)**, and **BI Engine**.",
        "whenToChoose": [
          "Analytical **SQL reporting, BI dashboards (Looker), log analytics, and petabyte-scale historical queries**.",
          "In-warehouse ML (`CREATE MODEL` in **BigQuery ML**) when data already lives in BigQuery and SQL analysts want rapid models.",
          "Optimize costs via **Partitioning + Clustering** (`require_partition_filter = true`), **never `SELECT *`**, and **Materialized Views**."
        ],
        "examTrap": "**NEVER use BigQuery as a high-concurrency sub-50ms OLTP backend** for shopping carts or user logins (high per-query startup latency ~hundreds of ms and DML quotas)! Also note `LIMIT 10` does **NOT** reduce bytes billed on unpartitioned/unclustered columns!",
        "exampleQ": {
          "stem": "Analysts run ad-hoc SQL queries over 400 TB of clickstream events filtered by `event_date` and `country_code`, while HR requires masking the `salary` column for non-HR users without duplicating tables.",
          "why": "Partitioning by `event_date` + clustering by `country_code` slashes scanned bytes, and Data Catalog Policy Tags enforce Column-Level Security."
        }
      },
      {
        "option": "Memorystore (Redis / Valkey / Memcached)",
        "badge": "Sub-ms In-Memory Cache",
        "description": "Fully managed in-memory datastore: **Redis / Valkey** (Standard Tier HA cross-zone failover, persistence/RDB, pub/sub, sorted sets/leaderboards) and **Memcached** (simple horizontal multi-threaded volatile key-value slab caching).",
        "whenToChoose": [
          "Offloading hot read traffic from Cloud SQL / AlloyDB / Firestore with **sub-millisecond latency**.",
          "Shared **HTTP user session state** across stateless Cloud Run / GKE / MIG instances.",
          "Real-time gaming **leaderboards** (Redis Sorted Sets) or distributed rate-limiting counters."
        ],
        "examTrap": "Not a durable primary system of record for compliance archives; remember serverless apps (**Cloud Run / App Engine**) need **Direct VPC Egress** or a **Serverless VPC Access Connector** to reach Memorystore’s private IP!",
        "exampleQ": {
          "stem": "A stateless GKE e-commerce storefront hammers Cloud SQL with repeated reads of the top 500 flash-sale product pages and needs sub-millisecond read latency plus HA failover.",
          "why": "Memorystore for Redis (Standard Tier) caches hot product payloads in memory with sub-ms latency and automatic cross-zone failover."
        }
      },
      {
        "option": "Cloud Storage (Classes, Autoclass, Retention & Signed URLs)",
        "badge": "Object Storage · 11 9s Durability",
        "description": "Global object storage (`99.999999999%` annual durability) with **Standard** (hot), **Nearline** (30d min), **Coldline** (90d min), **Archive** (365d min), **Autoclass** (automatic access-based tiering with no retrieval fees!), **Bucket Lock** (WORM), and **Signed URLs**.",
        "whenToChoose": [
          "**Unpredictable access patterns** across millions of objects $\\rightarrow$ enable **Autoclass**!",
          "Regulatory **immutable WORM retention** (FINRA / SEC 17a-4) $\\rightarrow$ **Retention Policy + Bucket Lock** (and Org Policy `storage.retentionPolicySeconds`).",
          "Temporary upload/download access for **non-Google external users** $\\rightarrow$ **Signed URLs** (+ **CORS** if browser JS uploads directly!)."
        ],
        "examTrap": "1) **Object Lifecycle Management** transitions based on *age/conditions*, whereas **Autoclass** automatically promotes cold objects back to Standard on read! 2) Deleting/overwriting Coldline/Archive objects before `90`/`365` days incurs **early deletion charges**.",
        "exampleQ": {
          "stem": "Your web SPA hosted on `app.example.com` lets unauthenticated customers upload 2 GB insurance claim videos directly from their browser into a private Cloud Storage bucket for 15 minutes.",
          "why": "Generate V4 Signed URLs (`PUT`) on the backend and configure a CORS policy on the bucket allowing `Origin: https://app.example.com`."
        }
      }
    ]
  },
  {
    "id": "vm-db-migration",
    "domain": "Data & Migration",
    "icon": "🚚",
    "title": "9. Application, VM & Database Migration Tooling",
    "subtitle": "Migration Center vs. Google Cloud VMware Engine (GCVE) vs. Migrate to VMs vs. Migrate to Containers vs. DMS",
    "decisionRule": "**Step 0 (Assess/TCO/Dependencies)?** $\\rightarrow$ **Migration Center**. **Fastest data-center exit of hundreds of VMware VMs with zero refactoring/re-IP?** $\\rightarrow$ **GCVE**. Rehost VMs onto **native Compute Engine**? $\\rightarrow$ **Migrate to VMs**. Minimal-downtime **DB CDC** to Cloud SQL/AlloyDB? $\\rightarrow$ **Database Migration Service (DMS)**.",
    "mermaid": "flowchart TD\n      Phase[\"Migration Phase & Target?\"] -->|\"1. Discovery, TCO & Dependency Mapping\"| MC[\"Migration Center\"]\n      Phase -->|\"2. Relational DB -> Cloud SQL / AlloyDB\"| DMS[\"Database Migration Service (CDC)\"]\n      Phase -->|\"3. VMware / Physical / Cloud VMs\"| VMGoal{\"Keep vSphere / NSX-T /<br/>L2 IPs intact for fast exit?\"}\n      VMGoal -->|\"Yes (Zero Refactoring / Urgent Exit)\"| GCVE[\"Google Cloud VMware Engine (GCVE)<br/>+ VMware HCX\"]\n      VMGoal -->|\"Convert to Native Compute Engine VMs\"| M2VM[\"Migrate to Virtual Machines\"]\n      VMGoal -->|\"Modernize Linux/Win VMs -> GKE / Cloud Run\"| M2C[\"Migrate to Containers\"]",
    "rows": [
      {
        "option": "Migration Center",
        "badge": "Step 0 · Assess & TCO",
        "description": "Unified discovery and planning platform that runs a lightweight discovery client/import to inventory on-premises servers, **map network dependencies**, right-size target GCP shapes, and generate **Total Cost of Ownership (TCO)** reports.",
        "whenToChoose": [
          "Always the **first step** when an enterprise has **undocumented legacy VMs, unknown inter-service dependencies**, or needs executive TCO/sizing recommendations before choosing migration waves."
        ],
        "examTrap": "Migration Center **assesses and plans** — it does not move bytes itself; pair it with **Migrate to VMs**, **GCVE**, or **DMS** for actual execution.",
        "exampleQ": {
          "stem": "Your CIO wants to close a data center with 600 undocumented servers in 9 months and first needs an automated inventory, application dependency graph, and right-sized GCP cost estimate.",
          "why": "Migration Center discovers assets, maps network dependencies into move groups, and produces right-sized TCO comparisons."
        }
      },
      {
        "option": "Google Cloud VMware Engine (GCVE)",
        "badge": "Zero-Refactor vSphere Cloud",
        "description": "Dedicated bare-metal **VMware vSphere, vCenter, vSAN, NSX-T, and HCX** private cloud inside Google data centers with native Layer-2 stretched networks (`HCX`) and private integration to GCP services.",
        "whenToChoose": [
          "**Urgent data-center lease expiration** with hundreds/thousands of VMware VMs where **changing IP addresses, rewriting VMware automation scripts, or re-architecting is too risky**.",
          "Workloads requiring full root vCenter/ESXi administrative features or L2 live `vMotion` across on-prem and cloud."
        ],
        "examTrap": "Higher ongoing cost than native Compute Engine/Cloud Run if you never modernize later; best for **lift-and-shift speed & VMware continuity**.",
        "exampleQ": {
          "stem": "A hospital’s data center lease expires in 60 days; 450 VMware VMs have hardcoded IP addresses and rely heavily on NSX-T micro-segmentation and custom vSphere backup tooling.",
          "why": "GCVE with VMware HCX stretches Layer-2 subnets for live migration while preserving existing IPs, NSX-T rules, and vSphere tooling."
        }
      },
      {
        "option": "Migrate to Virtual Machines (M2VM)",
        "badge": "Rehost -> Native GCE",
        "description": "Agentless continuous background block replication from on-premises **VMware vSphere**, AWS EC2, or Azure VMs directly into **native Compute Engine instances** (supports non-disruptive **Test Clones** before final cutover!).",
        "whenToChoose": [
          "Rehosting VMs onto **native Compute Engine** (retiring VMware licensing!) with minimal cutover downtime and automated OS boot adaptation."
        ],
        "examTrap": "Do not export/upload manual `.vmdk`/`.ova` images one by one for 200 VMs when continuous replication + test-clones via **Migrate to Virtual Machines** minimizes downtime and toil!",
        "exampleQ": {
          "stem": "You want to retire on-premises vSphere licenses and move 120 Linux and Windows VMs onto native Compute Engine instances with pre-cutover sandbox testing and <15 minutes of cutover downtime.",
          "why": "Migrate to Virtual Machines continuously replicates disk blocks in the background and spins up isolated Test Clones prior to final cutover."
        }
      },
      {
        "option": "Database Migration Service (DMS)",
        "badge": "Serverless CDC Replication",
        "description": "Serverless database migration tool using **continuous Change Data Capture (CDC)** for near-zero-downtime migrations to **Cloud SQL** (MySQL, PostgreSQL, SQL Server) and **AlloyDB** (including **Oracle $\\rightarrow$ PostgreSQL/AlloyDB** conversion workspaces with Gemini-assisted SQL translation).",
        "whenToChoose": [
          "Migrating live production relational databases to **Cloud SQL or AlloyDB** when **extended maintenance downtime (like `mysqldump` / `pg_dump` outage) is unacceptable**."
        ],
        "examTrap": "If a database is tiny (`< 10 GB`) and can tolerate a 1-hour weekend maintenance window, native `pg_dump` / Cloud Storage SQL import works fine; for **24/7 production zero/minimal downtime**, always choose **DMS continuous CDC**.",
        "exampleQ": {
          "stem": "An e-commerce company must migrate a 4 TB self-managed PostgreSQL database on AWS RDS to AlloyDB for PostgreSQL with less than 5 minutes of write cutover downtime.",
          "why": "Database Migration Service performs an initial snapshot plus continuous CDC replication over VPN/Peering until cutover promotion."
        }
      },
      {
        "option": "Backup and DR Service",
        "badge": "Centralized Vaulted Backup / DR",
        "description": "Centralized enterprise backup & disaster recovery platform supporting **incremental-forever block capture**, immutable **Backup Vaults**, and **instant virtual mount** recovery for Compute Engine, GCVE, VMware, SAP HANA, SQL Server, and Oracle.",
        "whenToChoose": [
          "Meeting strict **RTO (minutes via instant mount)** and ransomware-proof **immutable vaulted backups** across hybrid VMware + GCE + enterprise databases."
        ],
        "examTrap": "Do not confuse **DR backup recovery** (`Backup and DR`) with **permanent cloud cutover** (`Migrate to VMs` — though Backup and DR can mount/recover on-prem VMware VMs into GCE during a disaster!).",
        "exampleQ": {
          "stem": "Your CISO mandates immutable, ransomware-protected backups with <10-minute recovery mounts for both on-premises VMware databases and Compute Engine VMs.",
          "why": "Backup and DR Service provides enforced immutable Backup Vaults and instant live-mount recovery without waiting for full multi-TB restores."
        }
      }
    ]
  },
  {
    "id": "compute-spectrum",
    "domain": "Compute & Messaging",
    "icon": "🚀",
    "title": "10. Compute Spectrum: VMs, Containers & Serverless",
    "subtitle": "Compute Engine (MIGs / Sole-Tenant / Spot) vs. GKE (Autopilot vs. Standard) vs. Cloud Run (Services / Jobs) vs. Cloud Run functions",
    "decisionRule": "Stateless HTTP/gRPC container or batch job ($\\le 24\\text{h}$) scaling to zero? $\\rightarrow$ **Cloud Run**. Multi-service Kubernetes ecosystem / service mesh / StatefulSets / GPUs? $\\rightarrow$ **GKE Autopilot** (or **Standard** if node-level kernel/SSH needed). Custom OS, BYOL per-core Windows/Oracle licenses, or non-container legacy? $\\rightarrow$ **Compute Engine (+ Sole-Tenant Nodes)**.",
    "mermaid": "flowchart TD\n      Workload[\"Workload Packaging & Constraints?\"] -->|\"Legacy OS / Custom Kernel /<br/>Per-Socket BYOL License\"| GCE[\"Compute Engine VMs / MIGs<br/>(+ Sole-Tenant Nodes for BYOL)\"]\n      Workload -->|\"Single-Purpose Event Snippet\"| CRF[\"Cloud Run functions\"]\n      Workload -->|\"Containerized App / Job\"| K8sNeed{\"Need K8s APIs, StatefulSets,<br/>Istio Mesh, or Multi-Cloud Anthos?\"}\n      K8sNeed -->|\"No (Stateless HTTP/gRPC or Batch <= 24h)\"| CRun[\"Cloud Run (Services & Jobs)<br/>Scales 0 -> N\"]\n      K8sNeed -->|\"Yes\"| NodeCtrl{\"Need Host SSH, Custom Linux Kernel,<br/>or Privileged Node DaemonSets?\"}\n      NodeCtrl -->|\"No (Zero Node Ops + Pod Billing)\"| Autopilot[\"GKE Autopilot (Recommended)\"]\n      NodeCtrl -->|\"Yes\"| GKEStd[\"GKE Standard\"]",
    "rows": [
      {
        "option": "Compute Engine (MIGs, Spot VMs & Sole-Tenant Nodes)",
        "badge": "IaaS · Full OS Control",
        "description": "Full virtual machines: **Managed Instance Groups (MIGs)** for autohealing/autoscaling/rolling updates; **Spot VMs** (60–91% discount for fault-tolerant batch, 30s preemption notice); **Sole-Tenant Nodes** (dedicated physical server hardware).",
        "whenToChoose": [
          "Legacy COTS software, custom Linux kernel modules, Windows Active Directory, or stateful non-container apps.",
          "**Sole-Tenant Nodes:** **BYOL (Bring Your Own License)** per-physical-core/socket Windows Server or SQL Server licenses, or strict physical hardware isolation compliance!",
          "**Spot VMs:** stateless fault-tolerant rendering, genomics, or Spark worker nodes."
        ],
        "examTrap": "Never run **Spot VMs** for stateful databases or quorum masters, and remember **Regional MIGs** spread across 3 zones for HA (never rely on a single-zone MIG for critical production!).",
        "exampleQ": {
          "stem": "An enterprise is migrating Windows Server workloads carrying existing perpetual per-physical-processor Microsoft licenses that forbid multi-tenant host sharing.",
          "why": "Compute Engine Sole-Tenant Nodes dedicate physical host hardware to a single customer and expose physical core/socket visibility for BYOL compliance."
        }
      },
      {
        "option": "GKE Autopilot vs. GKE Standard",
        "badge": "Managed Kubernetes",
        "description": "**GKE Autopilot:** Google fully provisions/patches/secures nodes, bills strictly for **requested Pod vCPU/RAM/ephemeral storage**, enforces Pod security baselines. **GKE Standard:** You manage Node Pools, machine families, host OS tweaks, and pay per node VM.",
        "whenToChoose": [
          "**Choose GKE Autopilot (PCA default):** Kubernetes microservices, StatefulSets, GPUs, **Config Sync / GKE Enterprise (Anthos)** multi-cluster GitOps when teams want **zero node management**.",
          "**Choose GKE Standard:** Only when workloads require **direct SSH to nodes, custom kernel sysctls, or privileged host-network security agents** disallowed by Autopilot."
        ],
        "examTrap": "If a small team has **zero Kubernetes expertise** and just wants to run 3 stateless Docker containers that scale to zero overnight, **GKE is operational overkill — choose Cloud Run**!",
        "exampleQ": {
          "stem": "Your platform team runs 40 polyglot Kubernetes microservices with Helm charts and Istio mTLS across regions, and wants to eliminate node patching and idle node bin-packing waste.",
          "why": "GKE Autopilot preserves full Kubernetes/Helm compatibility while billing per Pod request and automating all node operations."
        }
      },
      {
        "option": "Cloud Run (Services & Jobs)",
        "badge": "Serverless Containers · 0 -> N",
        "description": "**Cloud Run Services:** Stateless HTTP/gRPC/WebSocket containers scaling `0 → 1000+` instances (or `min-instances >= 1` to eliminate cold starts!), built-in revision traffic splitting (canary/blue-green). **Cloud Run Jobs:** Run-to-completion batch/parallel tasks up to **24 hours**.",
        "whenToChoose": [
          "Any **stateless container API, web frontend, webhook, or GenAI backend** wanting zero infrastructure ops and scale-to-zero cost savings.",
          "**Cloud Run Jobs:** Nightly container scripts, DB schema migrations, or parallel file processing taking minutes to hours without listening on an HTTP port."
        ],
        "examTrap": "Local container filesystem is **in-memory ephemeral** (writes vanish when instances scale down — mount **Cloud Storage FUSE / Filestore** or write to **Cloud Storage / DBs**!). Also set **`min-instances`** if latency-sensitive apps cannot tolerate cold starts.",
        "exampleQ": {
          "stem": "You want to canary-test v2 of a containerized checkout API with 5% of live HTTPS traffic while scaling down to zero in staging environments overnight.",
          "why": "Cloud Run revisions natively support percentage-based traffic splitting (95% / 5%) and instant zero-downtime rollbacks."
        }
      },
      {
        "option": "Cloud Run functions (formerly Cloud Functions)",
        "badge": "Event-Driven Code Snippets",
        "description": "Single-purpose functions written in Python, Node.js, Go, Java, .NET, Ruby, or PHP (2nd gen runs on Cloud Run + **Eventarc** supporting 90+ GCP audit-log/Pub/Sub/GCS triggers and up to 60m HTTP / 9m event timeouts).",
        "whenToChoose": [
          "Lightweight **event-driven glue code** (e.g., generating a thumbnail when an image lands in Cloud Storage, reacting to a Pub/Sub alert, or remediating an IAM change via Eventarc Audit Logs) **without writing a `Dockerfile`**."
        ],
        "examTrap": "If you need custom system binaries, arbitrary languages, or multi-endpoint web frameworks packaged in your own `Dockerfile`, use a **Cloud Run Service** directly.",
        "exampleQ": {
          "stem": "Whenever a PDF invoice is uploaded to a Cloud Storage bucket, you want a 40-line Python script to invoke Document AI and insert extracted fields into Firestore with zero Dockerfile maintenance.",
          "why": "A Cloud Run function with a native Cloud Storage `google.cloud.storage.object.v1.finalized` trigger executes event-driven code serverlessly."
        }
      }
    ]
  },
  {
    "id": "messaging-data-pipelines",
    "domain": "Compute & Messaging",
    "icon": "📨",
    "title": "11. Messaging, Task Queues & Big Data Processing",
    "subtitle": "Pub/Sub vs. Cloud Tasks vs. Workflows vs. Cloud Dataflow vs. Managed Spark (Dataproc)",
    "decisionRule": "**1-to-Many decoupled event fan-out / streaming ingest?** $\\rightarrow$ **Pub/Sub**. **1-to-1 explicit HTTP target with dispatch rate-limiting / delay / dedup?** $\\rightarrow$ **Cloud Tasks**. **Serverless greenfield streaming + batch ETL?** $\\rightarrow$ **Dataflow (Apache Beam)**. **Lift-and-shift existing Apache Spark / Hadoop / PySpark code?** $\\rightarrow$ **Managed Spark (Dataproc)**.",
    "mermaid": "flowchart TD\n      Pattern[\"Workload Pattern?\"] -->|\"Async Messaging / Buffering\"| Msg{\"Publisher knows target & needs<br/>strict dispatch rate-throttling?\"}\n      Pattern -->|\"Multi-Step API State Machine\"| WF[\"Workflows (+ Cloud Scheduler)\"]\n      Pattern -->|\"Large-Scale ETL / Stream Processing\"| ETL{\"Existing Hadoop / PySpark code,<br/>or Greenfield Unified Stream+Batch?\"}\n      Msg -->|\"No (1-to-Many Decoupled Event Bus)\"| PubSub[\"Cloud Pub/Sub\"]\n      Msg -->|\"Yes (1-to-1 Throttled Worker Queue)\"| Tasks[\"Cloud Tasks\"]\n      ETL -->|\"Greenfield / Streaming Windowing\"| Dataflow[\"Cloud Dataflow (Apache Beam)\"]\n      ETL -->|\"Existing Spark / Hive / HDFS Migration\"| Spark[\"Managed Service for Apache Spark<br/>(Dataproc + GCS)\"]",
    "rows": [
      {
        "option": "Cloud Pub/Sub",
        "badge": "Global 1-to-Many Event Bus",
        "description": "Globally durable, auto-scaling publish/subscribe event ingestion bus supporting **fan-out** (multiple independent subscriptions per topic), **Push / Pull / BigQuery / Cloud Storage direct export subscriptions**, **Ordering Keys**, **Exactly-Once Delivery**, and **Dead-Letter Topics**.",
        "whenToChoose": [
          "**Decoupling microservices** or absorbing massive **spiky IoT/clickstream bursts** before downstream databases/workers.",
          "**Fan-out:** one `order-placed` event must simultaneously trigger billing, inventory, email notifications, and BigQuery analytics.",
          "Zero-code streaming straight into BigQuery via a **Pub/Sub BigQuery Subscription** when no heavy transformation is needed!"
        ],
        "examTrap": "Pub/Sub Push does **not** give publisher-controlled per-task scheduling delays (`scheduleTime`) or strict max-requests-per-second throttling to protect a fragile legacy 5 RPS SOAP API — use **Cloud Tasks** for that!",
        "exampleQ": {
          "stem": "A mobile game emits 250,000 telemetry JSON events/sec that already match your target BigQuery table schema and must be ingested in real time with minimal moving parts.",
          "why": "Pub/Sub with a direct BigQuery Subscription writes messages straight into BigQuery without needing a Dataflow pipeline."
        }
      },
      {
        "option": "Cloud Tasks",
        "badge": "1-to-1 Rate-Limited Queue",
        "description": "Managed distributed **task execution queue** where the producer explicitly targets an HTTP/Cloud Run/App Engine worker URL with **configurable max dispatch rate (`maxDispatchesPerSecond`), max concurrent tasks, retry backoff, task deduplication, and future scheduled execution (`scheduleTime`)**.",
        "whenToChoose": [
          "Protecting a **rate-limited downstream dependency** (e.g., an on-prem ERP or third-party API capped at `10 req/sec`) from traffic spikes.",
          "Scheduling individual delayed callbacks (e.g., *\"send abandoned-cart reminder exactly 45 minutes after checkout start\"*)."
        ],
        "examTrap": "1-to-1 only (**no multi-subscriber fan-out** — once one worker HTTP target returns `2xx`, the task is deleted). For recurring cron jobs (`0 2 * * *`), use **Cloud Scheduler**, not Cloud Tasks.",
        "exampleQ": {
          "stem": "Your Cloud Run checkout service receives 2,000 orders/sec during flash sales, but the legacy on-prem fulfillment API crashes if called faster than 25 requests/sec.",
          "why": "Enqueuing fulfillment calls into Cloud Tasks with `maxDispatchesPerSecond = 25` smooths spikes and retries transient 5xx errors."
        }
      },
      {
        "option": "Cloud Dataflow (Apache Beam)",
        "badge": "Serverless Stream + Batch ETL",
        "description": "Fully serverless, auto-scaling (`Horizontal` + `Vertical Prime`) execution engine for **Apache Beam** pipelines (Java, Python, Go, SQL) supporting **event-time windowing, watermarks, late/out-of-order data triggers**, and Dataflow Templates.",
        "whenToChoose": [
          "**Real-time streaming ETL** (Pub/Sub / Kafka $\\rightarrow$ enrich / redact PII via Sensitive Data Protection $\\rightarrow$ BigQuery / Bigtable).",
          "Pipelines with **unpredictable spikes** needing serverless autoscaling and **exact event-time windowing** for late-arriving mobile/IoT events."
        ],
        "examTrap": "If a team already has **thousands of lines of tested PySpark / Scala Spark / Hive MLlib jobs** and wants a fast migration **without rewriting code into Apache Beam**, choose **Dataproc / Managed Spark** instead!",
        "exampleQ": {
          "stem": "IoT sensors on airplanes upload timestamped telemetry hours late upon landing, and your pipeline must compute accurate 5-minute event-time aggregations in BigQuery without managing clusters.",
          "why": "Dataflow natively handles event-time windowing, watermarks, and allowed-lateness triggers serverlessly."
        }
      },
      {
        "option": "Managed Service for Apache Spark (Dataproc)",
        "badge": "Hadoop / Spark Lift & Shift",
        "description": "Managed **Apache Spark, Hadoop, Hive, Presto/Trino** clusters (or **Dataproc Serverless** for Spark batches without cluster tuning); decouples compute from storage using **Cloud Storage (`gs://`) connector instead of HDFS** + **ephemeral job-scoped clusters** + **Spot secondary workers**.",
        "whenToChoose": [
          "Migrating **existing on-premises Hadoop / Spark / PySpark / Hive workloads** with minimal code changes.",
          "**PCA Cost Optimization Rule:** Replace persistent 24/7 HDFS clusters with **Cloud Storage (`gs://`)** for data + **ephemeral per-job clusters** (or **Dataproc Serverless**) + **Spot VMs** as secondary compute-only workers!"
        ],
        "examTrap": "1) **Never store persistent data on local cluster HDFS** (blocks you from deleting idle clusters!). 2) Put Spot VMs in **secondary worker pools only** (`compute-only`, no HDFS blocks) so preemptions do not corrupt shuffle/HDFS state.",
        "exampleQ": {
          "stem": "Your data engineering team runs a 60-node on-prem Cloudera PySpark job for 3 hours every night and wants to cut cloud compute costs by 75% without rewriting PySpark code.",
          "why": "Store data in Cloud Storage and spin up ephemeral Managed Spark / Dataproc clusters (with Spot secondary workers) only for the 3-hour nightly run."
        }
      }
    ]
  },
  {
    "id": "security-perimeters-keys",
    "domain": "Security & AI",
    "icon": "🛡️",
    "title": "12. Zero-Trust Access, WAF, Data Exfiltration & Key Management",
    "subtitle": "Identity-Aware Proxy (IAP) vs. Cloud Armor vs. VPC Service Controls vs. KMS (GMEK/CMEK/CSEK) vs. Secret Manager vs. Sensitive Data Protection",
    "decisionRule": "**Zero-trust employee login / SSH without VPN?** $\\rightarrow$ **Cloud IAP**. **Public L7 DDoS / SQLi / XSS / Geo-block WAF?** $\\rightarrow$ **Cloud Armor**. **Block data exfiltration from BigQuery/GCS/Vertex AI APIs?** $\\rightarrow$ **VPC Service Controls**. **Store API keys/DB passwords?** $\\rightarrow$ **Secret Manager**. **Discover/de-identify PII?** $\\rightarrow$ **Sensitive Data Protection**.",
    "mermaid": "flowchart TD\n      Sec[\"Primary Security Threat / Requirement?\"] -->|\"Public Web DDoS, SQLi/XSS WAF, Geo/IP Rate Limit\"| Armor[\"Cloud Armor (on Load Balancer)\"]\n      Sec -->|\"Employee / Contractor Zero-Trust HTTPS or SSH/RDP (No VPN)\"| IAP[\"Identity-Aware Proxy (IAP)<br/>(+ Chrome Enterprise Context-Aware)\"]\n      Sec -->|\"Prevent Stolen Credentials Exfiltrating<br/>BigQuery / GCS / Vertex AI Data\"| VPCSC[\"VPC Service Controls (Security Perimeter)\"]\n      Sec -->|\"Detect, Mask, or Tokenize PII / PHI\"| SDP[\"Sensitive Data Protection (Cloud DLP)\"]\n      Sec -->|\"Manage Keys vs. Store App Secrets\"| Keys{\"Encryption Key or App Secret?\"}\n      Keys -->|\"App Passwords, API Keys, Certs\"| SM[\"Secret Manager\"]\n      Keys -->|\"Cryptographic Key Control / HSM\"| KMS[\"Cloud KMS (CMEK / HSM / CSEK)\"]",
    "rows": [
      {
        "option": "Cloud Identity-Aware Proxy (IAP)",
        "badge": "Zero-Trust BeyondCorp",
        "description": "Verifies **user identity (Google Identity / Workforce Identity) + device context (Access Context Manager / Chrome Enterprise Premium)** at Google’s edge before forwarding HTTPS requests to internal web apps or **TCP tunneling (`35.235.240.0/20`) for SSH/RDP** to private VMs.",
        "whenToChoose": [
          "Granting remote employees or contractors secure browser access to internal admin apps **without deploying client VPN software**.",
          "**SSH (`gcloud compute ssh --tunnel-through-iap`) or RDP** into Compute Engine VMs that have **zero external IP addresses** (allow firewall ingress only from `35.235.240.0/20`!)."
        ],
        "examTrap": "IAP authenticates **known users/identities** — do NOT enable IAP in front of a public anonymous consumer storefront (that blocks unauthenticated shoppers; use **Cloud Armor** for public storefronts!).",
        "exampleQ": {
          "stem": "Contractors on corporate-managed laptops need HTTPS access to an internal HR App Engine portal from home without installing a VPN client, blocked if device OS encryption is disabled.",
          "why": "Cloud IAP paired with Access Context Manager / Endpoint Verification enforces Zero-Trust user identity and device posture checks."
        }
      },
      {
        "option": "Cloud Armor",
        "badge": "Edge L7 WAF & DDoS",
        "description": "Edge Web Application Firewall and DDoS defense attached to **Application / Proxy Load Balancers** providing **preconfigured OWASP Top 10 rules (SQLi, XSS, LFI, Log4j)**, **Adaptive Protection** (ML L7 anomaly detection), bot reCAPTCHA, and IP/ASN/Geo rate-limiting.",
        "whenToChoose": [
          "Protecting **public-facing HTTPS APIs and websites** against Layer-7 DDoS floods, SQL injection, cross-site scripting, or blocking traffic from sanctioned countries.",
          "**Cloud Run Public WAF Pattern:** External Application LB + **Cloud Armor** + Serverless NEG + Cloud Run ingress set to **`Internal and Cloud Load Balancing`** (so attackers cannot bypass Cloud Armor via the default `.run.app` URL!)."
        ],
        "examTrap": "If you attach Cloud Armor to a Load Balancer in front of Cloud Run **without** changing Cloud Run ingress from `All` to `Internal and Cloud Load Balancing`, attackers can still hit the `*.run.app` URL directly!",
        "exampleQ": {
          "stem": "Your public Cloud Run storefront is experiencing Layer-7 HTTP flood attacks and SQL injection probes from specific IP ranges.",
          "why": "Place a Global External Application LB with Cloud Armor WAF/rate-limiting rules in front of Cloud Run and restrict Cloud Run ingress to Internal and Cloud Load Balancing."
        }
      },
      {
        "option": "VPC Service Controls (VPC-SC)",
        "badge": "Anti-Exfiltration Perimeter",
        "description": "Creates a cryptographic **service perimeter** around GCP projects and **multi-tenant Google-managed APIs** (`storage.googleapis.com`, `bigquery.googleapis.com`, `aiplatform.googleapis.com`), blocking API calls across the perimeter boundary even with valid stolen IAM credentials.",
        "whenToChoose": [
          "Prompt mentions **preventing data exfiltration**, **blocking insiders/compromised service accounts from copying BigQuery tables or GCS objects to an external personal GCP project**, or isolating **Vertex AI training data**.",
          "Use **Dry-Run Mode** first in production to audit perimeter violations in Cloud Audit Logs before enforcing!"
        ],
        "examTrap": "**VPC Firewall rules do NOT block `gsutil cp gs://corp-bucket gs://personal-bucket` or BigQuery cross-project copies** because Google APIs run on multi-tenant public/PGA endpoints — **ONLY VPC Service Controls** stops API-level data exfiltration!",
        "exampleQ": {
          "stem": "A bank wants to guarantee that even if a developer’s service account key is leaked, an attacker cannot query production BigQuery datasets from outside the corporate network or copy tables to an external GCP project.",
          "why": "VPC Service Controls wraps the project and `bigquery.googleapis.com` inside a security perimeter tied to corporate IP/identity access levels."
        }
      },
      {
        "option": "Cloud KMS (GMEK vs. CMEK vs. CSEK vs. HSM)",
        "badge": "Encryption Key Lifecycle",
        "description": "**GMEK:** Google-managed default encryption at rest. **CMEK:** Customer-Managed Encryption Keys in Cloud KMS (rotation schedules, instant key destruction/disable, **Cloud HSM** FIPS 140-2/3 Level 3 hardware option). **CSEK:** Customer-Supplied raw AES-256 key kept on-prem (Google never stores key on disk).",
        "whenToChoose": [
          "**CMEK (+ Cloud HSM):** Compliance requires **customer-controlled rotation schedules, audit logging of key usage, FIPS 140-2 Level 3 HSM**, or cryptographic erasure (\"crypto-shredding\").",
          "**CSEK:** Strict regulation mandates **Google must NEVER store the persistent key material anywhere in Google Cloud** (supported on Compute Engine disks & Cloud Storage)."
        ],
        "examTrap": "With **CSEK**, if you lose your on-premises key, **not even Google Support can recover your data**, and many managed services (BigQuery, Spanner) support **CMEK**, NOT CSEK!",
        "exampleQ": {
          "stem": "Financial regulators require that encryption keys protecting BigQuery datasets and Cloud Storage buckets reside in FIPS 140-2 Level 3 hardware modules with customer-enforced 90-day automatic rotation.",
          "why": "Customer-Managed Encryption Keys (CMEK) in Cloud KMS with the Cloud HSM protection level meet FIPS 140-2 Level 3 and automated rotation."
        }
      },
      {
        "option": "Secret Manager vs. Sensitive Data Protection (DLP)",
        "badge": "Secrets vs. PII Redaction",
        "description": "**Secret Manager:** Secure, versioned vault for **application secrets** (DB passwords, third-party API keys, OAuth client secrets) with IAM per-secret ACLs and Pub/Sub rotation hooks. **Sensitive Data Protection (DLP):** Scans GCS, BigQuery, or live text streams for **150+ PII/PHI infoTypes** and masks, redacts, or **format-preserving tokenizes (FPE)** them.",
        "whenToChoose": [
          "**Secret Manager:** Removing hardcoded credentials from Git / `Dockerfile` / `cloudbuild.yaml` env vars.",
          "**Sensitive Data Protection:** Redacting SSNs/credit cards before analytics/LLM prompts, or **crypto-deterministic FPE** so analysts can still `JOIN` tokenized customer IDs in BigQuery!"
        ],
        "examTrap": "Never store plaintext DB passwords in **ConfigMaps** or plain environment variables in Git; use **Secret Manager** (whereas **Cloud KMS** encrypts/decrypts envelopes rather than storing versioned secret payloads).",
        "exampleQ": {
          "stem": "Your CI/CD Cloud Build pipeline needs a third-party Stripe API key during integration tests without exposing the key in source control or build configs.",
          "why": "Store the key in Secret Manager, grant `roles/secretmanager.secretAccessor` to the Cloud Build service account, and reference `availableSecrets` in `cloudbuild.yaml`."
        }
      }
    ]
  },
  {
    "id": "ai-ml-spectrum",
    "domain": "Security & AI",
    "icon": "🤖",
    "title": "13. AI, ML & Generative AI Platform Spectrum (PCA v6.1)",
    "subtitle": "Pre-trained APIs vs. BigQuery ML vs. Vertex AI AutoML vs. Custom Training / Model Garden vs. Gemini Enterprise & Model Armor",
    "decisionRule": "**Standard task, zero training data?** $\\rightarrow$ **Pre-trained Cloud AI APIs**. **Tabular data in BigQuery + SQL-only team?** $\\rightarrow$ **BigQuery ML**. **Custom labeled dataset + minimal ML code?** $\\rightarrow$ **Vertex AI AutoML**. **Custom PyTorch/TF architecture or open weights?** $\\rightarrow$ **Vertex AI Custom Training / Model Garden**. **Protect LLM prompts/outputs from injection & PII?** $\\rightarrow$ **Model Armor**.",
    "mermaid": "flowchart TD\n      AI[\"AI / ML Use Case?\"] -->|\"Protect GenAI Prompts from<br/>Injection / Jailbreak / PII\"| MA[\"Model Armor (+ Sensitive Data Protection)\"]\n      AI -->|\"Turnkey Enterprise Search & Agents<br/>across Workspace / Jira / SharePoint\"| GemEnt[\"Gemini Enterprise (Agentspace)\"]\n      AI -->|\"Predictive / Custom ML\"| DataCheck{\"Need to train on your own<br/>proprietary labeled dataset?\"}\n      DataCheck -->|\"No (Standard OCR, Speech, Vision, Translate)\"| PreAPI[\"Pre-trained Cloud AI APIs<br/>(Document AI, Vision, Speech)\"]\n      DataCheck -->|\"Yes\"| Skill{\"Team Skill & Customization Need?\"}\n      Skill -->|\"SQL Analysts + Data already in BigQuery\"| BQML[\"BigQuery ML\"]\n      Skill -->|\"Domain Data + Minimal ML Coding\"| AutoML[\"Vertex AI AutoML\"]\n      Skill -->|\"Custom PyTorch / TensorFlow / Open Models\"| Custom[\"Vertex AI Custom Training &<br/>Endpoints / Batch Prediction\"]",
    "rows": [
      {
        "option": "Pre-trained Cloud AI APIs (Document AI, Vision, Speech, Translation)",
        "badge": "Zero Training Data · Fastest",
        "description": "Turnkey REST/gRPC APIs backed by Google foundation models (**Document AI** specialized invoice/form parsers, **Cloud Vision**, **Speech-to-Text**, **Text-to-Speech Chirp 3**, **Cloud Video Intelligence**) requiring **zero ML training data or ML engineering**.",
        "whenToChoose": [
          "Generic perception tasks (extracting line items from standard invoices/receipts, transcribing call-center audio, detecting explicit images) with **fastest time-to-production**."
        ],
        "examTrap": "Cannot learn proprietary domain-specific classes (e.g., classifying 12 proprietary semiconductor wafer defect types — use **Vertex AI AutoML Vision** for that!).",
        "exampleQ": {
          "stem": "An accounts-payable team wants to extract vendor names, totals, and tax lines from PDF invoices in 2 weeks with zero labeled training data and no data scientists on staff.",
          "why": "Document AI Invoice Parser extracts structured invoice fields out-of-the-box with zero model training."
        }
      },
      {
        "option": "Vertex AI AutoML vs. BigQuery ML",
        "badge": "Low-Code Custom ML",
        "description": "**Vertex AI AutoML:** Trains custom high-accuracy models on your labeled **image, video, text, or tabular** datasets with zero neural-network code. **BigQuery ML (`BQML`):** Trains/runs regression, classification, k-means, time-series (`ARIMA_PLUS`), or remote Gemini calls using **pure SQL inside BigQuery**.",
        "whenToChoose": [
          "**Vertex AI AutoML:** Domain-specific visual/text/tabular classification when you have labeled examples in GCS/BQ and want **minimal ML engineering**.",
          "**BigQuery ML:** Data already lives in **BigQuery**, features are tabular SQL columns, and **SQL data analysts** want to train/predict without exporting data!"
        ],
        "examTrap": "Do not export 50 TB of BigQuery tabular data to CSV in GCS just to train a basic churn logistic regression when **BigQuery ML** trains directly in-place with zero data movement!",
        "exampleQ": {
          "stem": "A factory has 25,000 labeled photos of proprietary circuit-board solder defects and wants to deploy an inspection model quickly without hiring PyTorch engineers.",
          "why": "Vertex AI AutoML Image Classification trains a custom model on proprietary defect photos without custom ML code."
        }
      },
      {
        "option": "Vertex AI Custom Training, Endpoints & Batch Prediction",
        "badge": "Full Control + Modular Serving",
        "description": "**Custom Training / Model Garden:** Full control over PyTorch, JAX, TensorFlow, custom containers, GPUs/TPUs (`AI Hypercomputer`). **Vertex AI Endpoints:** Real-time low-latency online HTTPS serving with traffic splitting & autoscaling (modularizes ML away from app servers!). **Batch Prediction:** Async high-throughput scoring of millions of rows in BQ/GCS.",
        "whenToChoose": [
          "**Modernizing tightly-coupled in-app ML models:** Decouple in-house Python ML code onto a **Vertex AI Endpoint** so ML teams iterate/swap models independently of the application backend!",
          "**Online Endpoint vs. Batch Prediction:** Pick **Endpoints** for synchronous user-facing millisecond predictions (fraud check at checkout); pick **Batch Prediction** for nightly bulk scoring (weekly marketing propensity scores)."
        ],
        "examTrap": "`⚠️ Exam 1 Q21 & Exam 3 Q51`: Never keep custom ML inference tightly coupled inside your monolithic Python web app VM if you want rapid AI agility, and never pay for 24/7 GPU Online Endpoints if predictions are only needed once a night (**use Batch Prediction**)!",
        "exampleQ": {
          "stem": "Your Python web app runs an in-house fraud detection model inside the same process and struggles to adopt new ML frameworks without redeploying the entire transaction backend.",
          "why": "Deploying the model behind a Vertex AI Endpoint decouples inference via a clean API with built-in traffic splitting and Model Monitoring."
        }
      },
      {
        "option": "Vertex AI Feature Store, Pipelines & Model Monitoring",
        "badge": "MLOps Governance",
        "description": "**Feature Store:** BigQuery-backed offline store + Bigtable/Optimized online serving store eliminating **training-serving skew** at low ms latency. **Pipelines:** Serverless Kubeflow/TFX DAG orchestration + ML Metadata lineage. **Model Monitoring:** Alerts on **Training-Serving Skew** (prod vs. training baseline) & **Prediction Drift** (prod shifting over time).",
        "whenToChoose": [
          "Multiple ML teams sharing curated features needing **low-latency online feature lookup** at inference time (`Exam 1 Q1`).",
          "Detecting silent accuracy degradation when live customer behavior shifts (**Drift**) or production feature pipelines diverge from training (**Skew**)."
        ],
        "examTrap": "Know **Skew vs. Drift**: **Training-Serving Skew** compares live inputs against *original training baseline data*; **Prediction Drift** tracks live inputs changing *over time* even when training baseline isn’t available!",
        "exampleQ": {
          "stem": "A real-time recommendation endpoint needs to look up a user’s 30-day rolling click aggregates in <10 ms while guaranteeing exact parity with offline training features.",
          "why": "Vertex AI Feature Store serves precomputed features online at single-digit millisecond latency from the same source definitions used offline."
        }
      },
      {
        "option": "Model Armor & Gemini Enterprise (Agentspace)",
        "badge": "⚠️ New PCA v6.1 GenAI Topics",
        "description": "**Model Armor** (integrated with Security Command Center & Sensitive Data Protection): Model-agnostic runtime firewall screening LLM **prompts and responses** against **prompt injection, jailbreaks, malicious URLs, safety harms, and PII leaks**. **Gemini Enterprise:** Turnkey grounded enterprise search & agent hub across Google Workspace, Confluence, Jira, SharePoint, and ServiceNow respecting source ACLs.",
        "whenToChoose": [
          "**Model Armor:** Customer-facing GenAI chatbots/agents needing centralized **prompt-injection defense and PII redaction** before prompts hit Gemini or third-party LLMs.",
          "**Gemini Enterprise:** Employees need unified enterprise RAG search & no-code agents over internal docs honoring existing user permissions."
        ],
        "examTrap": "**Cloud Armor** protects HTTP Layer-7 web endpoints against SQLi/XSS/DDoS, whereas **Model Armor** inspects **LLM prompt/response semantics** against prompt injection, jailbreaks, and sensitive data leaks!",
        "exampleQ": {
          "stem": "Your customer-support GenAI agent accepts free-form user prompts, and security requires blocking prompt-injection attacks and stripping accidental credit card numbers from both prompts and LLM responses.",
          "why": "Model Armor with Sensitive Data Protection integration enforces prompt-injection guardrails and bidirectional PII redaction."
        }
      }
    ]
  },
  {
    "id": "backup-dr-rto-rpo",
    "domain": "Backup, DR & Resilience",
    "icon": "🛟",
    "title": "14. Backup, Replication & Disaster Recovery Tiers (RTO vs. RPO)",
    "subtitle": "Cold (Snapshots/GCS) vs. Instant Snapshots vs. Backup & DR Service vs. Warm Standby (Async PD / Read Replica) vs. Hot HA (Regional PD / Cloud SQL HA) vs. Active-Active (Spanner)",
    "decisionRule": "Map two numbers first: **RPO** (how much *data loss* in time is tolerated: $0\\text{ s}$ requires **synchronous** writes; $1\\text{--}15\\text{ min}$ allows **async replication / CDC / Turbo Replication**; hours allows **scheduled snapshots**) and **RTO** (how fast *compute + storage* comes back online: $<1\\text{ s}$ needs **Active-Active**; $60\\text{--}120\\text{ s}$ needs **Regional HA Standby**; $5\\text{--}30\\text{ min}$ needs **Warm Standby / Instant Virtual Mount**; hours allows **Cold IaC + Snapshot hydrate**).",
    "mermaid": "flowchart TD\n      Start[\"What are the target RPO & RTO?\"] --> Zero[\"RPO = 0 & RTO ~ 0s<br/>(Global / Regional Survival)\"]\n      Start --> Sub2Min[\"RPO = 0 (Zonal) & RTO < 2 min<br/>(Single-Zone Outage)\"]\n      Start --> Min15[\"RPO <= 15 min & RTO 5-30 min<br/>(Cross-Region Disaster)\"]\n      Start --> Hours[\"RPO 1-4 hr & RTO Minutes-Hours<br/>(VMware / SAP / DB Ransomware DR)\"]\n      Start --> Cold[\"RPO 4-24 hr & RTO Hours+<br/>(Lowest Cost Compliance Backup)\"]\n      Zero --> ActAct[\"Multi-Region Active-Active<br/>(Global ALB + MIGs + Spanner)\"]\n      Sub2Min --> ZonalHA[\"Regional PD + Regional MIG<br/>or Cloud SQL HA Standby\"]\n      Min15 --> Warm[\"Warm Standby: Async PD Replication,<br/>Cloud SQL Cross-Region Replica, or GCS Turbo\"]\n      Hours --> BDR[\"Google Cloud Backup and DR Service<br/>(Immutable Vault + Instant Virtual Mount)\"]\n      Cold --> Snap[\"Cold DR: Standard PD Snapshots /<br/>GCS Archive + Terraform / Deployment\"]",
    "rows": [
      {
        "option": "Cold Backup (Standard PD Snapshots + Cloud Storage Nearline/Coldline/Archive + Terraform)",
        "badge": "RPO: 1–24 hr · RTO: 2–8+ hr · $",
        "description": "Incremental, compressed **Persistent Disk Standard/Archive Snapshots** stored in multi-regional/regional Cloud Storage + **Terraform / Infrastructure Manager** templates to provision VMs from scratch only when a disaster is declared.",
        "whenToChoose": [
          "Lowest-cost DR where business tolerates **hours of RTO and hours of RPO** (dev/test, batch reporting, archival compliance).",
          "Long-term regulatory retention (**PD Snapshot Archive** for $>90$ days or **GCS Archive + Bucket Lock WORM**; `Exam 4 Q27`)."
        ],
        "examTrap": "Standard PD Snapshots must **hydrate blocks from Cloud Storage** when restoring a new disk and have a minimum **10-minute** snapshot interval — they CANNOT meet $<5\\text{ min}$ RPO or $<5\\text{ min}$ RTO for multi-TB disks!",
        "exampleQ": {
          "stem": "A non-critical internal reporting system requires daily backups with a 24-hour RPO and 6-hour RTO while minimizing monthly idle compute spend to near zero.",
          "why": "Scheduled PD Snapshots + Cloud Storage + Terraform keeps zero standby VMs running and spins up compute only during failover."
        }
      },
      {
        "option": "PD Instant Snapshots (In-Place Rapid Rollback)",
        "badge": "RPO: Minutes · RTO: Seconds–Minutes (Same Zone/Region)",
        "description": "Point-in-time block references kept **directly on Persistent Disk / Hyperdisk storage** (not exported to GCS) enabling **near-instant disk creation/restore in seconds** before risky OS patches or schema upgrades.",
        "whenToChoose": [
          "Rapid **operational rollback** (bad DB migration, broken Linux patch, accidental `rm -rf`) where restoring multi-TB disks from GCS snapshots is too slow."
        ],
        "examTrap": "**Instant Snapshots are NOT cross-region DR backups!** If the entire region or underlying disk infrastructure fails, you STILL need **Standard Snapshots** or **Async PD Replication** in another region!",
        "exampleQ": {
          "stem": "Before running a high-risk PostgreSQL upgrade on a 10 TB Hyperdisk volume, the DBA needs a point-in-time recovery point that can restore the disk in under 2 minutes if the script corrupts tables.",
          "why": "Instant Snapshots capture block pointers locally without copying 10 TB to Cloud Storage and restore a new disk in seconds."
        }
      },
      {
        "option": "Backup and DR Service (Immutable Vaults + Incremental-Forever + Instant Virtual Mount)",
        "badge": "RPO: 15m–4h · RTO: Minutes · Ransomware Vault",
        "description": "Centralized enterprise backup & orchestrated DR for **on-premises VMware**, **GCVE**, **Compute Engine**, **SAP HANA**, **Oracle**, **SQL Server**, and **Cloud SQL**. Captures **incremental-forever** block changes into **Immutable/Indelible Backup Vaults** and mounts multi-TB images **instantly over NFS/iSCSI** without waiting for full restore copy!",
        "whenToChoose": [
          "On-premises **VMware -> GCP DR** with **1–4 hr RPO and minutes-to-hours RTO** and automated **Recovery Plans** (zero custom scripts; `Exam 1 Q32`, `Exam 3 Q59`).",
          "Ransomware protection requiring **enforced retention locks** in isolated Google-managed Backup Vaults.",
          "Mounting multi-TB production DB backups in **minutes** for dev/test cloning or instant live recovery."
        ],
        "examTrap": "Do NOT build custom cron scripts + `gsutil` + manual VM import to meet a 2h–4h RPO / 6h–8h RTO for on-prem VMware VMs — **Backup and DR Service** provides native incremental CBT capture and 1-click orchestrated failover!",
        "exampleQ": {
          "stem": "Your company runs critical VMware VMs on-premises and needs DR to Google Cloud with 2-hour RPO and 6-hour RTO, without a small IT team writing or maintaining custom failover scripts.",
          "why": "Backup and DR Service replicates incremental VMware blocks to GCP and runs automated Recovery Plans to boot VMs in order."
        }
      },
      {
        "option": "Warm Standby / Pilot Light (Async PD Replication · Cloud SQL Cross-Region Replica + PITR · GCS Turbo Replication)",
        "badge": "RPO: ~1–15 min · RTO: 5–20 min · $$",
        "description": "Continuous **asynchronous cross-region data replication** paired with minimal (\"Pilot Light\", `min=1`) or scaled-down (\"Warm\") compute ready to scale out on failover: **Compute Engine Async PD Replication** (`RPO ~1 min`), **Cloud SQL Cross-Region Read Replica** (manual/scripted promotion + binary/WAL **PITR**), and **Cloud Storage Dual-Region with Turbo Replication** (`100%` within **15-min RPO SLA**!).",
        "whenToChoose": [
          "**Full regional outage protection** requiring **RPO $\\le 1\\text{--}15\\text{ min}$ and RTO $5\\text{--}30\\text{ min}$** without paying $2\\times$ for full Active-Active capacity.",
          "Object storage compliance mandating a contractual **15-minute cross-region replication RPO** (**GCS Turbo Replication**)."
        ],
        "examTrap": "Default Cloud Storage Dual-Region / Multi-Region replication is **asynchronous best-effort** (no 15-min SLA) — you MUST enable **Turbo Replication** on a Dual-Region bucket if the exam demands a **guaranteed 15-minute RPO**!",
        "exampleQ": {
          "stem": "A regulated healthcare imaging platform stores DICOM scans in Cloud Storage and requires contractual assurance that 100% of newly uploaded objects are replicated to a second region >500 miles away within 15 minutes.",
          "why": "A Dual-Region Cloud Storage bucket with Turbo Replication enabled guarantees a 15-minute RPO across regions."
        }
      },
      {
        "option": "Regional Synchronous HA (Regional Persistent Disk · Cloud SQL HA · AlloyDB HA)",
        "badge": "RPO: 0 (Zonal) · RTO: 60–120 sec · $$$",
        "description": "**Synchronous block replication across 2 zones in the same region**: **Regional PD** writes to two zones simultaneously (paired with Stateful/Regional MIG force-attach on zone failure); **Cloud SQL HA** (`Exam 1 Q8`, `Exam 2 Q35`) and **AlloyDB HA** automatically fail over to a synchronous/regional standby in **~60–120 seconds** with **zero committed transaction loss ($\\text{RPO} = 0$)**.",
        "whenToChoose": [
          "Strict **$\\text{RPO} = 0$ (or $<5\\text{ min}$) and $\\text{RTO} < 2\\text{ min}$ (`90 seconds`)** for **zone or instance failures** without application rewrite (`Exam 1 Q8`, `Exam 2 Q35`)."
        ],
        "examTrap": "**Regional PD and Cloud SQL HA ONLY survive a single-ZONE outage!** Because both zones live inside the same region, a full **regional** outage still requires Cross-Region Replicas / Async PD / Backups!",
        "exampleQ": {
          "stem": "Your company is migrating a critical customer-facing PostgreSQL database to Google Cloud requiring RPO <= 5 minutes and automatic RTO <= 90 seconds during a zone failure with zero manual intervention.",
          "why": "Cloud SQL with High Availability (HA) synchronously replicates to a standby zone and fails over automatically in ~60–120s."
        }
      },
      {
        "option": "Multi-Region Active-Active (Global External ALB + Multi-Region MIGs/GKE/Run + Cloud Spanner)",
        "badge": "RPO: 0 · RTO: ~0 sec · 99.999% · $$$$",
        "description": "Live traffic served simultaneously in **2+ regions** behind **Global External Application Load Balancer** (Anycast health-checked auto-drain in seconds) backed by **Cloud Spanner multi-region** (synchronous Paxos quorum writes across regions, $\\text{RPO} = 0$, `99.999%` SLA — or Firestore/Bigtable multi-region).",
        "whenToChoose": [
          "Mission-critical Tier-0 financial/e-commerce workloads requiring **near-zero RTO ($\\approx 0\\text{ s}$), zero data loss ($\\text{RPO} = 0$), and survival of a full regional blackout**."
        ],
        "examTrap": "Highest cost ($4\\times\\text{--}10\\times$ Cold DR) and requires **stateless app tiers** + Spanner-compatible SQL schema; overkill when business requirements allow a 2-hour RTO!",
        "exampleQ": {
          "stem": "A global payment ledger cannot lose a single committed transaction (RPO = 0) and must continue processing writes with near-zero downtime (RTO ~ 0) even if an entire GCP region goes offline.",
          "why": "Multi-region Cloud Spanner + multi-region stateless compute behind Global ALB provides 99.999% availability with zero regional failover lag."
        }
      }
    ]
  },
  {
    "id": "backup-dr-data-connections",
    "domain": "Backup, DR & Resilience",
    "icon": "🔌",
    "title": "15. Hybrid Backup & Recovery Data Connections (Pipe Bandwidth vs. RPO / RTO Math)",
    "subtitle": "Public HTTPS / PGA vs. HA VPN vs. Partner Interconnect vs. Dedicated Interconnect vs. GCVE HCX Stretch vs. Transfer Appliance Seed",
    "decisionRule": "Your network pipe physically caps both **RPO** (can the pipe ship your **peak change rate** $\\Delta D$ inside the RPO window? $\\text{Required BW} \\ge \\frac{\\Delta D \\times 8}{\\text{RPO seconds}}$) and **RTO** (if restoring/hydrating $D$ back over WAN, $\\text{Restore Time} = \\frac{D \\times 8}{\\text{BW}}$; avoid WAN hydration during failover by pre-staging in GCP via **Backup & DR Vault / Warm Replica**!). Handy rule of thumb: **$1\\text{ Gbps} \\approx 450\\text{ GB/hr} \\approx 10.8\\text{ TB/day}$; $10\\text{ Gbps} \\approx 4.5\\text{ TB/hr} \\approx 108\\text{ TB/day}$**.",
    "mermaid": "flowchart TD\n      Start[\"Choose Data Pipe for On-Prem <-> GCP Backup & DR\"] --> Seed{\"Initial baseline > 40 TB<br/>over slow link (> 2 wks)? \"}\n      Seed -->|\"Yes (One-Time Seed ONLY!)\"| TA[\"1. Ship Transfer Appliance (40/300 TB)<br/>2. Cut over to VPN / Interconnect for ongoing RPO!\"]\n      Seed -->|\"No / Ongoing Replication\"| Churn{\"Ongoing Change Rate (RPO) &<br/>Failover Bandwidth Need?\"}\n      Churn -->|\"Cold Daily Backup to GCS<br/>(RPO 12-24h, Public TLS OK)\"| HTTPS[\"Public Internet TLS + STS / gcloud<br/>(Zero circuit lead time, variable jitter)\"]\n      Churn -->|\"<= 3 Gbps change rate,<br/>Private IP, RPO 15m-4h, Fast Setup\"| HAVPN[\"HA VPN (99.99% SLA, 1.5-3 Gbps/pair)<br/>+ Backup & DR Incremental Appliance\"]\n      Churn -->|\"50 Mbps - 10 Gbps steady,<br/>Low jitter DB CDC, No Google PoP\"| PartnerIC[\"Partner Interconnect (99.9% / 99.99% SLA)<br/>+ Datastream / Cloud SQL Replica / B&DR\"]\n      Churn -->|\"> 10-200 Gbps high churn, Sync/Near-Sync,<br/>or VMware HCX vMotion (< 5m RPO)\"| DedIC[\"Dedicated Interconnect (10G / 100G, 99.99%)<br/>(+ HA VPN / MACsec if encryption mandated)\"]",
    "rows": [
      {
        "option": "Public Internet TLS (HTTPS to `*.googleapis.com` + Storage Transfer Service / `gcloud`)",
        "badge": "Setup: Minutes · SLA: Best-Effort · Cold Backup",
        "description": "Uploads backups directly over ISP internet links using **TLS 1.3** to Cloud Storage (`Storage Transfer Service` Docker agents with bandwidth throttling, or `gcloud storage`). Zero VPN/VLAN circuits needed.",
        "whenToChoose": [
          "**Off-site Cold / Archival Backups** (`RPO: 12–24 hr`, `RTO: hours–days`) to Cloud Storage Nearline/Coldline/Archive.",
          "Branch offices or sites needing **immediate backup offload today** while waiting weeks for Interconnect circuits."
        ],
        "examTrap": "ISP internet links suffer unpredictable packet loss/jitter and cannot route **RFC 1918 private IPs** (required for VMware block replication, DMS private IP CDC, or Active Directory failover).",
        "exampleQ": {
          "stem": "A retail company wants to copy 2 TB of nightly compressed NAS archives from 30 regional stores to Cloud Storage Coldline every night between midnight and 5 AM without deploying VPN hardware.",
          "why": "Storage Transfer Service over HTTPS with scheduled bandwidth caps uploads encrypted objects directly to GCS with zero circuit overhead."
        }
      },
      {
        "option": "HA VPN + Backup & DR On-Premises Appliance (Incremental-Forever over IPsec)",
        "badge": "99.99% SLA · 1.5–3 Gbps/tunnel · RPO: 15m–4h · RTO: Min–Hrs",
        "description": "Two active/active IPsec tunnels (`99.99%` SLA, provisioned in **hours** with zero telco wait) paired with a local **Backup and DR Recovery Appliance** (or Database Migration Service CDC) shipping **changed blocks only** to GCP.",
        "whenToChoose": [
          "On-premises **VMware / SQL / Oracle DR** needing **15-min to 4-hour RPO** and **minutes-to-hours RTO** where hourly changed blocks fit within **1.5–6 Gbps** (`~0.6–2.5 TB/hr` of *delta* changes; `Exam 1 Q32`, `Exam 3 Q59`).",
          "Immediate encrypted private connectivity when Dedicated Interconnect takes weeks to provision."
        ],
        "examTrap": "Single Cloud VPN (Classic VPN) only gives `99.9%` SLA and is deprecated for new enterprise designs — ALWAYS pick **HA VPN** (`2 tunnels` = `99.99%` SLA) and watch the `~3 Gbps` per tunnel ceiling!",
        "exampleQ": {
          "stem": "Your data center generates 400 GB of changed VMware disk blocks per hour and needs encrypted private DR replication to Google Cloud within next week to meet a 2-hour RPO and 4-hour RTO.",
          "why": "400 GB/hr requires ~0.9 Gbps sustained throughput — HA VPN + Backup & DR Service deploys in hours with 99.99% SLA and easily meets 2h RPO."
        }
      },
      {
        "option": "Partner Interconnect (50 Mbps – 10 Gbps Private VLAN via Service Provider)",
        "badge": "99.9% or 99.99% SLA · Sub-10G Low Jitter · RPO: Sec–Min",
        "description": "Private Layer-2/Layer-3 circuit via a Google carrier partner when your data center is **not inside a Google colocation PoP** and needs deterministic latency/jitter for continuous DB/VM replication.",
        "whenToChoose": [
          "**Continuous database CDC / transactional replication** (Cloud SQL, AlloyDB, Oracle Data Guard, SQL Always On) requiring **consistent low latency and sub-minute RPO** at `500 Mbps – 10 Gbps`.",
          "Sites outside Google colocation facilities where ISP internet jitter breaks strict replication SLAs."
        ],
        "examTrap": "Interconnect VLAN traffic is **NOT encrypted by default** over the carrier circuit — if compliance requires encryption in transit over Partner Interconnect, layer **HA VPN over Cloud Interconnect**!",
        "exampleQ": {
          "stem": "A regional hospital (not in a Google PoP) replicates a clinical database to GCP with a 60-second RPO requiring steady 2 Gbps bandwidth and deterministic <10 ms jitter.",
          "why": "Redundant Partner Interconnect (4 VLAN attachments across 2 metro edge availability domains for 99.99% SLA) provides deterministic 2 Gbps private transport."
        }
      },
      {
        "option": "Dedicated Interconnect (10 Gbps / 100 Gbps × up to 8 Links + GCVE HCX / High-Churn DR)",
        "badge": "99.99% SLA · 10–800 Gbps · RPO: Near-Zero · Rapid Bulk RTO",
        "description": "Direct physical fiber cross-connect (`10G` or `100G` per link; `4.5 TB/hr` per `10G`, `45 TB/hr` per `100G`) in a Google colocation facility, supporting **MACsec L2** or **HA VPN over Interconnect** plus **Private Google Access for On-Premises Hosts (`199.36.153.8/30`)**.",
        "whenToChoose": [
          "**High-churn enterprise DR** (`>5–10 Gbps` continuous replication), **VMware Engine (GCVE) HCX live vMotion / L2 stretched subnets** (`Exam 1 Q41`), or **fast failback RTO** restoring dozens of TBs back on-premises.",
          "Lowest per-GB egress fee when continuously shipping petabytes of backups/logs."
        ],
        "examTrap": "Takes **weeks to provision physical cross-connects** in a colocation PoP — if an exam says *\"must be operational in 3 days\"*, pick **HA VPN now** while Dedicated Interconnect is being ordered!",
        "exampleQ": {
          "stem": "A financial firm in an Equinix PoP needs to replicate 35 TB/day of database redo logs and VMware HCX replication traffic to GCVE with <5-minute RPO and low latency.",
          "why": "Redundant 10 Gbps / 100 Gbps Dedicated Interconnects across 2 metro edge zones deliver 99.99% SLA and sub-ms PoP latency."
        }
      },
      {
        "option": "Hybrid Seed + Delta Pattern (Transfer Appliance Baseline → STS / Backup & DR over VPN/Interconnect)",
        "badge": "⚠️ Classic Two-Step Exam Pattern",
        "description": "Uses a physical **Transfer Appliance** (`40 TB` or `300 TB`, AES-256 CMEK encrypted) **ONLY once** to seed a massive initial backup/DR baseline when WAN upload would take weeks, then switches to **continuous incremental replication** over HA VPN / Interconnect to hit tight RPO!",
        "whenToChoose": [
          "**Initial dataset is huge ($100\\text{ TB}–1\\text{ PB+}$) on a constrained WAN link**, AND the business STILL requires a **continuous hours/minutes RPO** after cutover!"
        ],
        "examTrap": "**NEVER pick Transfer Appliance alone for ongoing Backup/DR!** Shipping a physical box takes **days–weeks** (making ongoing RPO = weeks!). Always pair it with **incremental network replication** for ongoing deltas!",
        "exampleQ": {
          "stem": "You have 250 TB of on-premises media and VM backups over a 500 Mbps link (70% saturated) and need Google Cloud DR with a 1-hour ongoing RPO where daily delta changes are only 300 GB.",
          "why": "250 TB over 150 Mbps free WAN would take ~180 days — seed the 250 TB via Transfer Appliance, then replicate the 300 GB/day (~28 Mbps) ongoing deltas over HA VPN!"
        }
      }
    ]
  },
  {
    "id": "all-databases-master-comparison",
    "domain": "Databases & Storage",
    "icon": "🧭",
    "title": "16. Master All-Database Head-to-Head Comparison (SQL vs. NoSQL vs. OLAP vs. Cache)",
    "subtitle": "One-Page Specs: Cloud SQL · AlloyDB · Cloud Spanner · Firestore · Bigtable · BigQuery · Memorystore",
    "decisionRule": "Ask **3 questions in order**: **(1) OLTP vs. OLAP vs. Cache?** (`OLAP SQL` $\\rightarrow$ **BigQuery**; `Sub-ms Cache` $\\rightarrow$ **Memorystore**). **(2) Relational SQL or NoSQL?** (`JSON Docs + Mobile Sync` $\\rightarrow$ **Firestore**; `>10k writes/s Sub-10ms Wide-Column IoT/Time-Series` $\\rightarrow$ **Bigtable**). **(3) Which Relational Scale?** (`Regional MySQL/PG/SQL Server` $\\rightarrow$ **Cloud SQL**; `Enterprise PG + HTAP + pgvector` $\\rightarrow$ **AlloyDB**; `Global Multi-Region Active-Active Writes / 99.999% SLA` $\\rightarrow$ **Cloud Spanner**).",
    "mermaid": "flowchart TD\n      Start{\"1. Primary Workload Type?\"} -->|\"Sub-ms In-Memory Cache /<br/>Sessions / Leaderboards\"| Mem[\"Memorystore<br/>(Redis / Valkey / Memcached)\"]\n      Start -->|\"Petabyte SQL Analytics / BI /<br/>Ad-Hoc Reporting / BQML\"| BQ[\"BigQuery<br/>(Serverless Columnar OLAP)\"]\n      Start -->|\"Operational OLTP<br/>(Low-Latency Reads & Writes)\"| Model{\"2. Relational SQL Schema<br/>or Non-Relational NoSQL?\"}\n      Model -->|\"NoSQL\"| NoSQLType{\"JSON Docs + Mobile/Offline<br/>vs. Massive Stream (>10k QPS)?\"}\n      NoSQLType -->|\"Hierarchical JSON, ACID, Mobile/Web SDK,<br/>Scales to $0, <= 1 MB/doc\"| FS[\"Firestore<br/>(99.999% Multi-Region)\"]\n      NoSQLType -->|\"Wide-Column Key-Value, >1 TB,<br/><10ms IoT / Time-Series / HBase\"| BT[\"Cloud Bigtable<br/>(Linear Node Write Scaling)\"]\n      Model -->|\"Relational ACID SQL\"| SQLScale{\"3. Multi-Region Active-Active Writes<br/>or Horizontal Write Sharding?\"}\n      SQLScale -->|\"Yes (Global TrueTime, 99.999% SLA, ∞ PB)\"| Spanner[\"Cloud Spanner<br/>(GoogleSQL / PG Dialect)\"]\n      SQLScale -->|\"No (Single-Region Primary Writes)\"| Engine{\"PostgreSQL needing 4x OLTP +<br/>100x HTAP Columnar + pgvector?\"}\n      Engine -->|\"Yes (<= 128 TB, 99.99% SLA, + Omni)\"| Alloy[\"AlloyDB for PostgreSQL\"]\n      Engine -->|\"No (MySQL / PG / SQL Server, <= 64-128 TB)\"| CSQL[\"Cloud SQL<br/>(Enterprise 99.95% / Plus 99.99%)\"]",
    "rows": [
      {
        "option": "Cloud SQL (MySQL · PostgreSQL · SQL Server)",
        "badge": "SQL OLTP · <= 64/128 TB · 99.95%/99.99% SLA · Regional Writes",
        "description": "**Specs:** Relational ACID SQL | **Storage:** `<= 64 TB` (Enterprise) / `<= 128 TB` (Enterprise Plus) | **Write Scaling:** Vertical only (1 regional primary) | **Read Scaling:** Horizontal (Read Replicas + Enterprise Plus Data Cache) | **Multi-Region:** Async cross-region replica for DR promotion (`RPO > 0`).",
        "whenToChoose": [
          "Standard regional CRM, ERP, WordPress, or microservice transactional DB using **MySQL, PostgreSQL, or SQL Server**.",
          "Lowest operational friction for lift-and-shift SQL when writes fit on a single primary VM (`<= 96–128 vCPUs`)."
        ],
        "examTrap": "Cannot do active-active multi-region writes; Read Replicas are async (never confuse with sync Regional HA standby).",
        "exampleQ": {
          "stem": "Lift-and-shift a 4 TB regional MySQL order database needing automatic cross-zone failover (`RPO = 0`) and IAM-based connection security from GKE.",
          "why": "Cloud SQL Regional HA + Cloud SQL Auth Proxy sidecar meets ACID MySQL, zero-data-loss zonal failover, and IAM auth."
        }
      },
      {
        "option": "AlloyDB for PostgreSQL (+ AlloyDB Omni)",
        "badge": "PG HTAP + GenAI · <= 128 TB · 99.99% SLA · Regional Primary",
        "description": "**Specs:** 100% PostgreSQL | **Storage:** Auto-scales up to `128 TB` (`Colossus` log-structured storage) | **Perf:** `4×` OLTP, `100×` analytical via **Columnar Engine** | **SLA:** `99.99%` *including maintenance* (`<60s` failover) | **Portability:** **AlloyDB Omni** runs in containers on-prem/AWS/Azure.",
        "whenToChoose": [
          "**Oracle-to-PostgreSQL** migrations, high-TPS enterprise PostgreSQL, **HTAP** real-time operational analytics, or **`pgvector` ScaNN** GenAI RAG.",
          "Hybrid/disconnected sovereign environments needing identical cloud & on-prem PostgreSQL (**AlloyDB Omni**)."
        ],
        "examTrap": "PostgreSQL-only; still single-region primary for writes (Cross-Region Secondary is read-only until promoted).",
        "exampleQ": {
          "stem": "Replace an expensive on-prem Oracle DB with managed PostgreSQL supporting 99.99% uptime during maintenance, live BI queries without impacting checkout TPS, and vector embeddings.",
          "why": "AlloyDB combines 99.99% maintenance-inclusive SLA, Columnar Engine HTAP isolation, and accelerated `pgvector`."
        }
      },
      {
        "option": "Cloud Spanner",
        "badge": "Global Distributed SQL · ∞ PB · 99.999% SLA · Active-Active Writes",
        "description": "**Specs:** Relational ACID SQL (`GoogleSQL` or `PostgreSQL` interface) | **Storage & Writes:** **Linear horizontal write & read scaling** (`100 PU` up to multi-PB) | **Consistency:** External strong consistency via atomic **`TrueTime`** | **SLA:** **`99.999%`** multi-region (`<5.26m/yr`), `99.99%` regional.",
        "whenToChoose": [
          "**Multi-region simultaneous writes**, global user base needing local read/write latency with zero stale/conflicting ledgers, or relational DBs exceeding `128 TB` / single-node write limits."
        ],
        "examTrap": "Never use sequential `AUTO_INCREMENT` / monotonic timestamp leading PKs (causes tablet split hotspots — use UUIDv4 / bit-reversed keys).",
        "exampleQ": {
          "stem": "Global multi-player game / banking ledger needing strongly consistent ACID SQL transactions written simultaneously in US, EU, and APAC with 99.999% uptime.",
          "why": "Only Cloud Spanner provides 99.999% multi-region SLA with strongly consistent horizontal SQL writes."
        }
      },
      {
        "option": "Firestore (Native Mode vs. Datastore Mode)",
        "badge": "Serverless JSON Document · Scales to $0 · 99.999% Multi-Region",
        "description": "**Specs:** Document NoSQL (`<= 1 MB/doc`) | **Consistency:** Strong ACID multi-doc transactions | **SLA:** `99.999%` multi-region, `99.99%` regional | **Pricing:** Serverless pay-per-op (**scales to `\\$0`**) | **Modes:** **Native Mode** (mobile/web SDKs, real-time listeners, **offline sync**) vs. **Datastore Mode** (high-throughput server backends).",
        "whenToChoose": [
          "Mobile/web apps needing **offline local cache + automatic sync**, real-time live UI subscriptions, user profiles, or serverless app catalogs."
        ],
        "examTrap": "Not for millions of raw IoT time-series writes/sec (pick **Bigtable**) or ad-hoc multi-TB analytical joins (pick **BigQuery**).",
        "exampleQ": {
          "stem": "Retail store associates use tablets in dead Wi-Fi zones to update inventory counts JSON docs that must sync automatically upon reconnection.",
          "why": "Firestore Native Mode SDK provides built-in offline persistence and automatic conflict-resolved sync."
        }
      },
      {
        "option": "Cloud Bigtable",
        "badge": "Wide-Column NoSQL · >1 TB–PB · <10 ms @ 10k–1M+ QPS · HBase",
        "description": "**Specs:** Sparse wide-column key-value (`Apache HBase` compatible) | **Latency:** Consistent **`< 10 ms`** at `~10,000 QPS/node` (scales linearly to millions of QPS) | **SLA:** `99.999%` multi-cluster routing (eventual cross-cluster replication; single-row atomic mutations).",
        "whenToChoose": [
          "Massive high-velocity **IoT sensor streams, smart meters, financial tick data, AdTech clickstreams, ML feature serving**, or **HBase** migrations (`> 1 TB`)."
        ],
        "examTrap": "Single indexed **row key** only (no SQL joins, no multi-row transactions, no secondary indexes); **never lead row key with raw timestamp**!",
        "exampleQ": {
          "stem": "Ingest 250,000 smart-grid telemetry events/sec (`80 TB/yr`) with `<10 ms` reads of the latest 24 hours per meter ID.",
          "why": "Bigtable handles linear 250k+/s writes at sub-10ms latency using row key `meter_id#reverse_timestamp`."
        }
      },
      {
        "option": "BigQuery",
        "badge": "Serverless Columnar Data Warehouse · PB–EB OLAP + BQML",
        "description": "**Specs:** Serverless SQL **OLAP** warehouse (`Colossus` storage + `Dremel` compute slots) | **Latency:** Sub-second to seconds (`BI Engine` caches sub-second Looker dashboards) | **Features:** Partitioning + Clustering, **Storage Write API** streaming, **BigQuery ML**, Policy Tag column masking, Federated queries (`BigLake` / Cloud SQL / Spanner / GCS).",
        "whenToChoose": [
          "Enterprise **analytics, historical reporting, log/event warehousing, cross-dataset SQL joins, and SQL-native ML (`BQML`)** at TB–PB scale."
        ],
        "examTrap": "**Never pick BigQuery as an OLTP database** for high-frequency single-row `UPDATE`/`DELETE` app transactions!",
        "exampleQ": {
          "stem": "Run complex SQL aggregations across 600 TB of 5-year retail sales history with column-level PII masking for external analysts.",
          "why": "BigQuery partitioned/clustered tables + Policy Tag Column-Level Security is purpose-built for petabyte OLAP."
        }
      },
      {
        "option": "Memorystore (Redis · Redis Cluster · Valkey · Memcached)",
        "badge": "In-Memory Key-Value · <1 ms Latency · Cache & Session Tier",
        "description": "**Specs:** Fully managed in-memory store (`< 1 ms` latency) | **Engines:** **Redis / Valkey** (data structures, Sorted Sets, Pub/Sub, Standard HA cross-zone replica, **Cluster** sharding) vs. **Memcached** (pure multi-threaded volatile key-value cache).",
        "whenToChoose": [
          "**Read-through/look-aside caching** in front of Cloud SQL / AlloyDB / Spanner, stateless **session state**, rate limiters, or real-time **leaderboards**."
        ],
        "examTrap": "Volatile RAM tier (not a primary durable system of record); private VPC-only IP requires **Direct VPC Egress / Serverless VPC Connector** from Cloud Run.",
        "exampleQ": {
          "stem": "Absorb 80,000 RPS of repetitive product-catalog reads and maintain a real-time top-100 flash-sale leaderboard in `<1 ms`.",
          "why": "Memorystore for Redis / Valkey serves sub-millisecond cached reads and native Sorted Set leaderboards."
        }
      }
    ]
  },
  {
    "id": "workload-db-admin-connections",
    "domain": "Networking & Hybrid",
    "icon": "🔐",
    "title": "17. Workload, Database, Admin SSH & Keyless Auth Connections (Component-to-Component)",
    "subtitle": "IAP TCP Forwarding + OS Login vs. Bastion · Cloud SQL / AlloyDB Auth Proxy · GKE Private Control Plane · Workload Identity · MACsec vs. VPN over Interconnect",
    "decisionRule": "**Admin $\\rightarrow$ Private VM?** **IAP TCP Forwarding (`35.235.240.0/20`) + OS Login (`2FA`)** (no public IP, no Bastion VM). **App $\\rightarrow$ Cloud SQL / AlloyDB?** **Auth Proxy** (or Cloud Run Unix socket) + **IAM DB Auth** over **PSA** or **PSC**. **GKE Pod $\\rightarrow$ GCP API?** **Workload Identity Federation for GKE**. **AWS / GitHub / On-Prem $\\rightarrow$ GCP API?** **Workload Identity Federation (OIDC/SAML)** (never JSON keys!). **Encrypt Interconnect at 10G/100G line rate?** **MACsec** (Dedicated L2) vs. **HA VPN over Interconnect** (L3 IPsec on Dedicated or Partner).",
    "mermaid": "flowchart TD\n      Start{\"What Component Connection<br/>Are You Securing?\"} -->|\"Admin / Dev -> Private VM<br/>(SSH 22 / RDP 3389 / TCP)\"| Admin{\"Normal Access or<br/>Broken Boot / Firewall?\"}\n      Admin -->|\"Normal Zero-Trust Admin\"| IAP[\"IAP TCP Forwarding (35.235.240.0/20)<br/>+ OS Login (IAM + 2FA)\"]\n      Admin -->|\"Boot Failure / Network Down\"| Serial[\"Interactive Serial Console<br/>(Out-of-Band Recovery Only)\"]\n      Start -->|\"Compute Workload -> Cloud SQL<br/>or AlloyDB\"| DBConn[\"Cloud SQL / AlloyDB Auth Proxy<br/>(mTLS 1.3 + IAM DB Auth over PSA or PSC)\"]\n      Start -->|\"CI/CD -> Private GKE<br/>Control Plane\"| GKECP[\"DNS-Based Endpoint (IAM + VPC-SC)<br/>or Cloud Build Private Pool + Auth Networks\"]\n      Start -->|\"Workload -> Google Cloud APIs<br/>(Zero JSON Keys!)\"| Where{\"Where Does the<br/>Workload Run?\"}\n      Where -->|\"Inside GKE Pods\"| WIGKE[\"Workload Identity Federation for GKE<br/>(KSA bound directly to IAM)\"]\n      Where -->|\"AWS / Azure / GitHub / On-Prem\"| WIF[\"Workload Identity Federation<br/>(OIDC / SAML -> STS Short-Lived Token)\"]\n      Start -->|\"Encrypt Traffic Over<br/>Cloud Interconnect\"| Enc{\"Need 10G/100G Line Rate<br/>on Dedicated Interconnect?\"}\n      Enc -->|\"Yes (Dedicated L2 Hop)\"| MAC[\"MACsec for Cloud Interconnect<br/>(IEEE 802.1AE Wire-Speed L2)\"]\n      Enc -->|\"End-to-End L3 VPC or Partner IC\"| HAVPNIC[\"HA VPN over Cloud Interconnect<br/>(IPsec Tunnels Inside VLAN)\"],",
    "rows": [
      {
        "option": "IAP TCP Forwarding + Compute Engine OS Login",
        "badge": "Zero-Trust SSH/RDP · 35.235.240.0/20 · IAM + 2FA",
        "description": "**Specs:** Tunnels `SSH (22)`, `RDP (3389)`, and arbitrary internal TCP ports over HTTPS from Google’s edge (`35.235.240.0/20`) to **private-IP-only VMs** (`gcloud compute start-iap-tunnel`) | **OS Login:** Maps Google Cloud Identity / Workspace users directly to Linux POSIX UIDs and SSH keys via IAM (`roles/compute.osLogin` or `osAdminLogin`, plus `enable-oslogin-2fa=TRUE`), auto-revoking SSH access the instant a user leaves Google Groups.",
        "whenToChoose": [
          "Administrators or contractors need **auditable SSH/RDP access to private VMs** with **zero external IPs** and **no VPN or Bastion VM**.",
          "Centralized SSH key lifecycle, **2FA enforcement**, and automatic offboarding across **hundreds of Linux VMs / projects** (**OS Login**)."
        ],
        "examTrap": "**Firewall Trap:** IAP TCP Forwarding requires a VPC ingress firewall rule allowing **`35.235.240.0/20`** on port `22`/`3389` (NOT `0.0.0.0/0`, and NOT the admin’s home laptop IP!). Also never manually paste SSH keys into Project/Instance Metadata when **OS Login** is available.",
        "exampleQ": {
          "stem": "Your security team manages 400 Debian and RHEL VMs across 6 projects with no external IPs. When an engineer leaves the company, revoking their Cloud Identity account must immediately block SSH access without touching VM metadata.",
          "why": "Enabling OS Login (`enable-oslogin=TRUE`) at the Organization/Project level + IAP TCP Forwarding ties SSH directly to Cloud Identity + IAM roles (`roles/iap.tunnelResourceAccessor` + `roles/compute.osLogin`)."
        }
      },
      {
        "option": "Bastion Host (Jump VM) vs. Interactive Serial Console",
        "badge": "⚠️ Legacy Jump Box vs. Emergency Boot Recovery",
        "description": "**Bastion Host:** Hardened Compute Engine VM in a DMZ subnet used as an SSH jump box to reach private VMs (adds VM cost, OS patching, and key management toil) | **Interactive Serial Console:** Out-of-band console connection (`port 9600` / `serial-port-enable=TRUE`) directly to the VM’s virtual serial port without needing a working guest NIC or SSH daemon.",
        "whenToChoose": [
          "**Bastion Host:** Only when a legacy protocol/jump tool cannot use `gcloud` IAP TCP tunneling, or when bridging a strict multi-NIC air-gapped inspection zone.",
          "**Interactive Serial Console:** Strictly for **emergency troubleshooting** when a VM fails to boot (`fstab`/kernel panic) or a bad guest firewall rule locks out SSH."
        ],
        "examTrap": "On PCA v6.1, **Bastion Host with an external IP is almost always a silver-medal distractor** against **IAP TCP Forwarding**! And **Organization Policy `constraints/compute.disableSerialPortAccess`** should keep Serial Console **disabled by default** in production except during active break-glass debugging.",
        "exampleQ": {
          "stem": "After editing `/etc/fstab` on a critical stateful Compute Engine VM, the instance refuses SSH connections over IAP and fails health checks during boot.",
          "why": "Temporarily enable the Interactive Serial Console (`serial-port-enable=TRUE`) to inspect boot logs and repair `/etc/fstab` out-of-band without needing guest networking."
        }
      },
      {
        "option": "Cloud SQL Auth Proxy / AlloyDB Auth Proxy (+ Cloud Run Unix Socket)",
        "badge": "mTLS 1.3 · IAM DB Auth · Zero Cert Rotation",
        "description": "**Specs:** Lightweight local binary / GKE sidecar container (and **built-in `--add-cloudsql-instances` Unix socket `/cloudsql/...` on Cloud Run**) that establishes an outbound **`TLS 1.3` mutually authenticated tunnel** using short-lived ephemeral certificates | **IAM DB Auth:** Authenticates workloads via their Service Account (`roles/cloudsql.client` + `roles/cloudsql.instanceUser` / `roles/alloydb.databaseUser`) with **zero static DB passwords** | **Transports:** Works over **Private IP (PSA)**, **Private Service Connect (PSC)**, or **Public IP**.",
        "whenToChoose": [
          "Connecting **GKE pods (sidecar), Compute Engine VMs, Cloud Run services, or on-premises apps** to **Cloud SQL or AlloyDB** without managing SSL certificates or authorized IP CIDR allowlists.",
          "Combining **Auth Proxy + Private IP (Direct VPC Egress + PSA or PSC)** so traffic stays 100% off the public internet AND encrypted/IAM-authenticated."
        ],
        "examTrap": "**Two classic traps:** (1) Cloud SQL Auth Proxy **does NOT automatically make traffic private** — if the DB only has a Public IP, the proxy encrypts over the internet; for private routing from Cloud Run, pair **Private IP (PSA/PSC) + Direct VPC Egress**! (2) **Authorized Networks** only work for **Public IP** Cloud SQL instances (and require static CIDRs, which dynamic serverless IPs don’t have!).",
        "exampleQ": {
          "stem": "A Cloud Run microservice must connect to a private-IP AlloyDB / Cloud SQL PostgreSQL cluster with zero static database passwords, zero SSL certificate rotation, and no public internet traversal.",
          "why": "Configure Direct VPC Egress on Cloud Run into the VPC subnet, connect over Private IP (PSA or PSC) via the Auth Proxy / Language Connector, and enable IAM Database Authentication."
        }
      },
      {
        "option": "Private GKE Control Plane Connections (DNS Endpoint vs. Private Pool)",
        "badge": "DNS Endpoint (IAM + VPC-SC) · Authorized Networks",
        "description": "**DNS-Based Control Plane Endpoint (Modern GCP Standard):** Exposes the GKE control plane via a Google-managed DNS FQDN governed purely by **IAM + VPC Service Controls** — reachable from **any region, VPC, Cloud Build pool, or hybrid network** via Private Google Access with **zero IP CIDR allowlists** | **IP-Based Private Endpoint + Authorized Networks:** Legacy private RFC 1918 `/28` peering endpoint requiring **Cloud Build Private Worker Pools** (peered via PSA/HA VPN) + explicit CIDR blocks in Control Plane Authorized Networks.",
        "whenToChoose": [
          "CI/CD pipelines (**Cloud Build / Cloud Deploy**) or platform engineers on hybrid VPN/Interconnect need `kubectl` access to a **private GKE cluster** with minimal network plumbing (**DNS-based endpoint**, or **Cloud Build Private Pool** when strict private IP isolation is mandated)."
        ],
        "examTrap": "Default **Cloud Build hosted workers** run in a Google-managed multi-tenant network with dynamic public IPs — they **cannot** reach a private-IP-only GKE control plane unless you either use a **Cloud Build Private Pool** (connected to your VPC) or GKE’s **DNS-based endpoint** with IAM/VPC-SC!",
        "exampleQ": {
          "stem": "Your GKE cluster disables public IP access to its control plane. Cloud Build / Cloud Deploy pipelines fail with connection timeouts when running `kubectl apply`.",
          "why": "Run deployments on a Cloud Build Private Pool connected privately to the VPC (and add its subnet to Control Plane Authorized Networks, or enable GKE’s IAM-governed DNS control plane endpoint)."
        }
      },
      {
        "option": "Workload Identity Federation for GKE (Pod -> GCP APIs)",
        "badge": "Pod-Level IAM · Zero JSON Keys · PCA Best Practice",
        "description": "**Specs:** Configures the GKE cluster’s built-in OIDC provider so **Kubernetes Service Accounts (`KSA`)** can be granted IAM roles **directly as IAM principals** (`principal://iam.googleapis.com/projects/.../sa/<KSA>`, or impersonate a Google Service Account) — intercepts the GKE Metadata Server per pod so Pod A cannot use Pod B’s GCP permissions on the same node.",
        "whenToChoose": [
          "**Every scenario** where pods in **GKE Standard or GKE Autopilot** call **Cloud Storage, BigQuery, Pub/Sub, Spanner, Secret Manager, or Vertex AI**!"
        ],
        "examTrap": "**Automatic elimination rules:** Eliminate any choice that **(1)** downloads a **Service Account JSON key** into a Kubernetes `Secret` or container image, or **(2)** grants `roles/editor` / `cloud-platform` scope to the **GKE Node Pool’s Compute Engine Service Account** (which leaks permissions to every pod on that node!).",
        "exampleQ": {
          "stem": "Twelve microservices share a GKE cluster, but only the `billing-worker` Deployment is allowed to read a sensitive Cloud Storage bucket; security forbids static credentials.",
          "why": "Workload Identity Federation for GKE binds only the `billing-worker` Kubernetes Service Account to `roles/storage.objectViewer` on that bucket with automatic short-lived tokens."
        }
      },
      {
        "option": "Workload Identity Federation (External Clouds, CI/CD & On-Premises)",
        "badge": "Keyless OIDC / SAML -> STS Token · AWS / Azure / GitHub",
        "description": "**Specs:** Trusts external identity providers (**AWS IAM roles, Azure Entra ID, GitHub Actions OIDC, GitLab, Okta, Active Directory SAML/OIDC, on-prem Kubernetes**) via a **Workload Identity Pool + Provider**, exchanging external tokens at **Security Token Service (`sts.googleapis.com`)** for **short-lived Google access tokens (`1 hour`)**.",
        "whenToChoose": [
          "**GitHub Actions / GitLab CI** deploying to GCP, **AWS EC2/Lambda or Azure VMs** querying BigQuery/GCS, or **on-premises servers** accessing GCP APIs **without creating or rotating Service Account keys** (`constraints/iam.disableServiceAccountKeyCreation`)."
        ],
        "examTrap": "**NEVER pick \"Create a user-managed Service Account key and store it in GitHub Secrets / HashiCorp Vault with 90-day rotation\"** when **Workload Identity Federation** is an option — keyless federation eliminates exportable long-lived credentials completely!",
        "exampleQ": {
          "stem": "Your engineering team stores source code in GitHub and must push container images to Artifact Registry from GitHub Actions while Organization Policy `iam.disableServiceAccountKeyCreation` is enforced.",
          "why": "Configure a Workload Identity Pool & GitHub OIDC Provider restricted by attribute condition (`assertion.repository_owner`) to issue short-lived tokens with zero SA keys."
        }
      },
      {
        "option": "Encryption Over Cloud Interconnect (MACsec L2 vs. HA VPN over Interconnect L3)",
        "badge": "10G/100G Wire-Speed L2 vs. End-to-End IPsec L3",
        "description": "**By default, Cloud Interconnect is unencrypted private fiber** (unlike HA VPN). Two native GCP encryption options: **(1) MACsec for Cloud Interconnect:** `IEEE 802.1AE` Layer-2 hop-by-hop hardware encryption at **full `10 Gbps` / `100 Gbps` line rate** on **Dedicated Interconnect** | **(2) HA VPN over Cloud Interconnect:** Deploys encrypted **Layer-3 IPsec VPN tunnels** (`~1.5–3 Gbps/tunnel`, scales horizontally by adding tunnels) directly inside **Dedicated OR Partner Interconnect** VLAN attachments.",
        "whenToChoose": [
          "Pick **MACsec** when compliance mandates encryption over **Dedicated Interconnect** AND you need **full `10 Gbps` / `100 Gbps` wire-speed throughput** with sub-millisecond overhead.",
          "Pick **HA VPN over Cloud Interconnect** when using **Partner Interconnect** (where L2 hops traverse a carrier) OR when strict compliance requires **end-to-end Layer-3 IPsec encryption** all the way from your on-premises router into your GCP VPC."
        ],
        "examTrap": "**Two major traps:** (1) Assuming Dedicated/Partner Interconnect encrypts traffic automatically — it does **not** unless you add **MACsec**, **HA VPN over Interconnect**, or application TLS! (2) Picking **MACsec** on **Partner Interconnect** — MACsec only protects the direct physical Layer-2 fiber between your colocation router and Google’s edge on **Dedicated Interconnect**!",
        "exampleQ": {
          "stem": "A regulated bank uses Partner Interconnect (5 Gbps) between its data center and Google Cloud and must enforce network-layer IPsec encryption on every packet before it traverses the carrier.",
          "why": "Deploy HA VPN over Cloud Interconnect so encrypted IPsec tunnels terminate end-to-end between the on-premises VPN gateway and Google’s HA VPN gateway inside the Interconnect VLAN."
        }
      }
    ]
  },
  {
    "id": "all-connections-master-comparison",
    "domain": "Networking & Hybrid",
    "icon": "🕸️",
    "title": "18. Master End-to-End GCP Connection Comparison (Source → Destination Cheat Sheet)",
    "subtitle": "One-Page Reference Across All 9 Connection Paths: Bandwidth · SLA · Encryption · Transitivity · Overlapping-IP Support",
    "decisionRule": "Match **Source $\\rightarrow$ Destination + Constraints**: **(1) On-Prem $\\leftrightarrow$ VPC:** `<3 Gbps` over Internet $\\rightarrow$ **HA VPN**; `10G–200G` at Google POP $\\rightarrow$ **Dedicated Interconnect**; `50M–50G` via carrier $\\rightarrow$ **Partner Interconnect**. **(2) Multi-Cloud $\\leftrightarrow$ VPC:** **Cross-Cloud Interconnect**. **(3) VPC $\\leftrightarrow$ VPC:** Same Org $\\rightarrow$ **Shared VPC**; Cross-Org no overlap $\\rightarrow$ **VPC Peering**; Hub-and-Spoke $\\rightarrow$ **NCC**. **(4) Overlapping CIDRs / Producer SaaS / Managed DB:** **Private Service Connect (`PSC`)** beats **PSA** (no transitive peering trap!). **(5) Cloud Run $\\rightarrow$ VPC:** **Direct VPC Egress**. **(6) Private VM $\\rightarrow$ Google APIs vs. Internet:** **PGA** vs. **Cloud NAT**.",
    "mermaid": "flowchart TD\n      Src{\"1. What Are the Two<br/>Endpoints Connecting?\"} -->|\"On-Prem / Other Cloud<br/><-> GCP VPC\"| Hyb{\"Physical Colocation, Carrier,<br/>Multi-Cloud, or Internet?\"}\n      Hyb -->|\"Internet (<= 3 Gbps/tunnel)\"| VPN[\"HA VPN (IPsec, 99.99% w/ 2 IFs)\"]\n      Hyb -->|\"At Google POP (10G / 100G)\"| Ded[\"Dedicated Interconnect (+ MACsec / VPN)\"]\n      Hyb -->|\"Via Carrier (50M - 50G)\"| Part[\"Partner Interconnect (+ VPN for IPsec)\"]\n      Hyb -->|\"AWS / Azure / OCI (10G / 100G)\"| CCI[\"Cross-Cloud Interconnect\"]\n      Src -->|\"VPC <-> VPC<br/>(Multi-Project)\"| V2V{\"Same Org Centralized, Cross-Org,<br/>or Global Hybrid Hub?\"}\n      V2V -->|\"Same Org + Central NetOps\"| SVPC[\"Shared VPC (Host + Service Projects)\"]\n      V2V -->|\"Cross-Org, Non-Overlapping\"| Peer[\"VPC Network Peering (Non-Transitive)\"]\n      V2V -->|\"Many VPCs + Hybrid Spokes\"| NCC[\"Network Connectivity Center (NCC)\"]\n      Src -->|\"VPC / Serverless -> Managed DB,<br/>Google APIs, SaaS, or Internet\"| Priv{\"Target Destination?\"}\n      Priv -->|\"Cloud Run -> VPC\"| DVE[\"Direct VPC Egress (No Connector VMs)\"]\n      Priv -->|\"Managed DB / Cross-Org SaaS\"| PSC[\"PSC (Overlapping IPs OK!) vs. PSA (Peering)\"]\n      Priv -->|\"Google APIs vs. Public Web\"| Out[\"PGA (Google APIs) vs. Cloud NAT (Outbound Web)\"]",
    "rows": [
      {
        "option": "On-Premises ↔ VPC via HA VPN (vs. Deprecated Classic VPN)",
        "badge": "Internet IPsec · 1.5–3 Gbps/tunnel · 99.99% SLA",
        "description": "**Path:** On-Prem VPN Gateway $\\leftrightarrow$ GCP VPC over Public Internet | **Bandwidth:** `1.5 Gbps` (`3 Gbps` w/ jumbo frames) per tunnel; scale via ECMP across multiple tunnels | **SLA:** **`99.99%`** (requires 2 HA VPN interfaces + **Cloud Router dynamic BGP** + 2 tunnels to 1 peer w/ 2 interfaces or 4 tunnels to 2 peers) | **Encryption:** Built-in `IPsec` (`IKEv1/IKEv2`).",
        "whenToChoose": [
          "Fastest hybrid setup (hours, not weeks), encrypted backup path for Interconnect, or steady hybrid bandwidth **`<= 3–6 Gbps`**."
        ],
        "examTrap": "**Classic VPN** (`99.9%` SLA, single IP, static policy routing) is deprecated for production HA — always choose **HA VPN + Cloud Router (BGP)**!",
        "exampleQ": {
          "stem": "Establish encrypted private connectivity between your on-premises data center and GCP within 48 hours with a 99.99% availability SLA and automatic failover.",
          "why": "HA VPN with Cloud Router dynamic BGP and redundant tunnels across two peer gateway interfaces provides 99.99% SLA immediately over existing internet circuits."
        }
      },
      {
        "option": "On-Premises ↔ VPC via Dedicated Interconnect",
        "badge": "Direct Colocation Fiber · 10G×8 / 100G×2 · 99.99% SLA",
        "description": "**Path:** Your Router $\\leftrightarrow$ Google Edge inside a **shared colocation facility** | **Bandwidth:** `10 Gbps` (up to `8 = 80 Gbps`) or `100 Gbps` (up to `2 = 200 Gbps`) per link; VLAN attachments + Cloud Router | **SLA:** **`99.99%`** requires **4 links/VLANs across 2 Edge Availability Domains in 2 separate metro areas** (`99.9%` with 2 links in 1 metro) | **Encryption:** Unencrypted L2 by default (add **MACsec** or **HA VPN over Interconnect**).",
        "whenToChoose": [
          "Sustained **`>= 10 Gbps`** hybrid traffic, massive data replication, or ultra-low jitter when your equipment can physically cross-connect in a **Google colocation POP**."
        ],
        "examTrap": "Two links in a **single** colocation metro only qualify for **`99.9%`** SLA — **`99.99%`** strictly requires **two distinct metropolitan colocation facilities** + global dynamic routing!",
        "exampleQ": {
          "stem": "A financial trading platform colocated in Equinix Ashburn & Chicago requires 40 Gbps of deterministic low-latency private bandwidth to GCP with a 99.99% SLA.",
          "why": "Four 10 Gbps Dedicated Interconnect connections split across two Edge Availability Domains in two distinct metros delivers 40 Gbps at 99.99% SLA."
        }
      },
      {
        "option": "On-Premises ↔ VPC via Partner Interconnect",
        "badge": "Carrier NSP VLAN · 50 Mbps – 50 Gbps · No POP Needed",
        "description": "**Path:** Your Data Center $\\leftrightarrow$ Certified Telco/NSP $\\leftrightarrow$ GCP VPC | **Bandwidth:** Flexible **`50 Mbps` to `50 Gbps`** VLAN attachments | **SLA:** **`99.99%`** (4 VLANs across 2 EADs in 2 metros) or **`99.9%`** (2 VLANs across 2 EADs in 1 metro) | **Encryption:** Unencrypted by default (add **HA VPN over Interconnect** for end-to-end IPsec).",
        "whenToChoose": [
          "Your data center **is NOT in a Google colocation facility**, OR you need private SLA connectivity at **sub-10 Gbps (`50 Mbps–5 Gbps`)** without paying for full `10 Gbps` Dedicated ports."
        ],
        "examTrap": "Never pick **Direct Peering** or **Carrier Peering** to reach Compute Engine/GKE private IPs — Peering only reaches **public Google APIs / Workspace** outside VPC and carries **no GCP SLA**!",
        "exampleQ": {
          "stem": "A regional hospital 400 miles from the nearest Google colocation POP needs a redundant 2 Gbps private SLA link to its GCP VPC.",
          "why": "Partner Interconnect bridges the last mile via a certified carrier at fractional 2 Gbps capacity with up to 99.99% SLA."
        }
      },
      {
        "option": "Multi-Cloud (AWS / Azure / OCI) ↔ GCP VPC via Cross-Cloud Interconnect",
        "badge": "10G / 100G Cloud-to-Cloud · 99.99% SLA · Zero Third-Party Router",
        "description": "**Path:** **AWS Direct Connect / Azure ExpressRoute / OCI FastConnect / Alibaba** $\\leftrightarrow$ GCP VPC | **Bandwidth:** Dedicated `10 Gbps` or `100 Gbps` physical cloud-to-cloud ports provisioned by Google | **SLA:** **`99.99%`** (4 redundant VLANs across 2 metros) | **Encryption:** Optional **MACsec** or **HA VPN**.",
        "whenToChoose": [
          "High-throughput (`>= 10 Gbps`), low-latency multi-cloud workloads (e.g., AWS app tier querying AlloyDB/Spanner/BigQuery) without renting colocation cages or third-party cloud exchange routers."
        ],
        "examTrap": "If multi-cloud traffic is **low-bandwidth (`< 2 Gbps`)** or tight on budget, **Multi-Cloud HA VPN** (between AWS Transit Gateway/VGW and GCP HA VPN) wins on cost!",
        "exampleQ": {
          "stem": "Stream 25 Gbps of real-time telemetry from AWS production VPCs into GCP Vertex AI and BigQuery with sub-5ms jitter and zero third-party colocation hardware.",
          "why": "Cross-Cloud Interconnect provides managed 10G/100G physical ports directly between AWS Direct Connect and GCP VPC."
        }
      },
      {
        "option": "VPC ↔ VPC: Shared VPC vs. VPC Peering vs. Network Connectivity Center (NCC)",
        "badge": "Same-Org Shared Subnet vs. Cross-Org Peer vs. Global Hub",
        "description": "**Shared VPC:** 1 Host Project shares subnets/VPN/firewalls with many Service Projects (**same GCP Org only**, centralized NetOps, transitive via single VPC) | **VPC Peering:** 1-to-1 route exchange (**works cross-Org**, **non-transitive** `A-B + B-C != A-C`, no overlapping CIDRs, quota ceilings) | **NCC:** Global Hub connecting **VPC spokes** (mesh/star) + **Hybrid spokes** (VPN, Interconnect, SD-WAN appliances).",
        "whenToChoose": [
          "**Shared VPC:** Default enterprise choice inside **1 GCP Org** when a central network team governs subnets, firewalls, and hybrid Interconnects.",
          "**VPC Peering:** Connecting two independent VPCs across **different GCP Orgs** (with non-overlapping RFC 1918 CIDRs).",
          "**NCC:** Scaling **dozens/hundreds of VPCs** or routing site-to-site/hybrid spokes through a central global hub."
        ],
        "examTrap": "**Two classic traps:** (1) **Shared VPC cannot span two different GCP Organizations** (post-M&A before org consolidation $\\rightarrow$ use **PSC** or **VPC Peering**). (2) **VPC Peering is strictly non-transitive** — On-Prem $\\rightarrow$ Hub VPC $\\rightarrow$ Peered Spoke VPC fails without **NCC** or **PSC**!",
        "exampleQ": {
          "stem": "Five application teams in one GCP Organization each need their own project IAM/billing isolation while sharing a single set of centrally governed subnets and Dedicated Interconnects.",
          "why": "Shared VPC places subnets and Interconnect VLANs in one Host Project and attaches the five application projects as Service Projects."
        }
      },
      {
        "option": "Consumer VPC / Hybrid ↔ Managed DB or SaaS: PSC vs. PSA",
        "badge": "⚠️ PCA v6.1 Star · PSC Solves Overlapping IPs & Transitivity!",
        "description": "**Private Service Connect (`PSC`):** Consumer forwarding rule (`PSC Endpoint`), `PSC Backend` (with LB), or `PSC Interface` connecting privately to a Producer **Service Attachment** or Google APIs using **NAT** — **zero VPC peering, works across overlapping CIDRs (`10.0.0.0/8` on both sides!), works cross-Org, and works transitively over VPN/Interconnect!** | **Private Services Access (`PSA`):** Allocates `/16`–`/24` in your VPC + creates **VPC Peering** to Google’s tenant VPC for Cloud SQL / AlloyDB / Memorystore.",
        "whenToChoose": [
          "Pick **PSC** whenever you see **overlapping IP ranges** (post-acquisition M&A!), **cross-organization SaaS publishing**, **peering quota limits**, or **on-premises apps reaching Cloud SQL / AlloyDB over VPN/Interconnect without custom route peering headaches**.",
          "Pick **PSA** for simple single-VPC private IP provisioning of Cloud SQL, AlloyDB, Memorystore, or Filestore when CIDRs don’t collide."
        ],
        "examTrap": "**PSA Transitive Peering Trap:** Because **PSA** uses **VPC Peering** under the hood, an on-premises server on Cloud VPN/Interconnect **cannot** reach a PSA Cloud SQL IP unless you explicitly **export custom routes** on the PSA peering (or switch to a **PSC Endpoint** inside your VPC subnet, which is immediately routable from on-prem!).",
        "exampleQ": {
          "stem": "After acquiring another company in a separate GCP Organization whose VPC also uses `10.10.0.0/16`, their workloads must privately call one internal gRPC microservice in your VPC without re-IPing.",
          "why": "Publish the microservice behind an Internal Load Balancer + PSC Service Attachment and create a PSC Endpoint in the acquired company’s VPC — NAT handles overlapping `10.10.0.0/16` CIDRs cleanly."
        }
      },
      {
        "option": "Serverless (Cloud Run / Functions) → Private VPC: Direct VPC Egress vs. Connector",
        "badge": "⚡ Subnet IPs vs. Legacy /28 VMs",
        "description": "**Direct VPC Egress (Modern Default):** Assigns internal RFC 1918 IPs directly from your VPC subnet to **Cloud Run services, jobs, and 2nd-gen functions** — **zero connector VMs, scales to `\\$0` when idle, lower latency, higher multi-Gbps throughput**, supports Network Tags + firewall rules | **Serverless VPC Access Connector:** Deploys always-on `e2-micro`/`f1-micro` bridge VMs in a dedicated `/28` subnet (incurs idle VM charges & throughput bottlenecks).",
        "whenToChoose": [
          "**Always prefer Direct VPC Egress** when Cloud Run or Cloud Run functions (2nd gen) connect to **Memorystore, AlloyDB, Cloud SQL private IP, internal LBs, or VMs** (ensure subnet has sufficient free IPs, e.g., `/24`–`/22`).",
          "Pick **Serverless VPC Access Connector** only for **App Engine Standard / 1st-gen Functions** or legacy scenarios explicitly unsupported by Direct VPC Egress."
        ],
        "examTrap": "Watch out for **subnet IP sizing** with Direct VPC Egress: during traffic spikes, Cloud Run reserves subnet IPs proportional to max instances — never point Direct VPC Egress at a tiny `/28` subnet!",
        "exampleQ": {
          "stem": "A spiky Cloud Run service must read from a private Memorystore for Redis instance with sub-millisecond overhead and zero idle infrastructure charges overnight.",
          "why": "Direct VPC Egress connects Cloud Run straight to the VPC subnet with zero connector VM bottleneck and scales to $0 at night."
        }
      },
      {
        "option": "Private Workloads → Google APIs (PGA) vs. Public Internet (Cloud NAT)",
        "badge": "Free Subnet Flag (Google APIs) vs. Outbound SNAT (Internet)",
        "description": "**Private Google Access (`PGA`):** Free subnet flag letting private-IP-only VMs/GKE nodes reach **`*.googleapis.com`** (`private.googleapis.com` `199.36.153.8/30` or `restricted.googleapis.com` `199.36.153.4/30` for VPC-SC) over Google’s internal network via the default internet gateway route (`0.0.0.0/0` or `199.36.153.4/30`) | **Cloud NAT:** Regional software-defined **outbound SNAT** on Cloud Router for reaching **external third-party internet endpoints** (`apt`, `PyPI`, Stripe/Twilio webhooks) with **zero inbound unsolicited access**.",
        "whenToChoose": [
          "**Only reaching Cloud Storage / BigQuery / Pub/Sub / Artifact Registry?** Enable **Private Google Access (`PGA`)** (free — no Cloud NAT needed!).",
          "**Private VMs / GKE / Cloud Run (via Direct VPC Egress) calling external OS repos or partner APIs with a static allowlisted egress IP?** Configure **Cloud NAT**."
        ],
        "examTrap": "**Two huge traps:** (1) Paying for **Cloud NAT** just to read **Cloud Storage** (`PGA` does this free!). (2) Expecting **Cloud NAT** to accept **inbound** customer requests — Cloud NAT is strictly **outbound-initiated SNAT** (use **Cloud Load Balancing** for inbound!). Also: for **on-premises** hosts reaching Google APIs privately over VPN/Interconnect, enable **Private Google Access for On-Premises Hosts** (`199.36.153.4/30` / `8/30` advertised via Cloud Router BGP + split-horizon DNS).",
        "exampleQ": {
          "stem": "Private Compute Engine batch VMs with no external IPs must pull OS security patches from external Ubuntu mirrors AND read/write sensitivity-classified BigQuery datasets inside a VPC-SC perimeter.",
          "why": "Use Cloud NAT for outbound Ubuntu patch downloads, and route `*.googleapis.com` via `restricted.googleapis.com` (`199.36.153.4/30`) with Private Google Access for VPC-SC-compliant BigQuery access."
        }
      },
      {
        "option": "External Clients / Employees → Private GCP Apps: Cloud LB + Armor vs. Cloud IAP",
        "badge": "Public Customer Traffic (WAF/Anycast) vs. Employee Zero-Trust",
        "description": "**Cloud Load Balancing + Cloud Armor:** Terminates public customer traffic at Google’s global/regional edge (`HTTPS L7 ALB`, `SSL/TCP Proxy`, or `UDP/TCP Passthrough NLB`) with **Cloud Armor WAF/DDoS** + **Serverless NEGs / Private MIGs** | **Cloud Identity-Aware Proxy (`IAP`):** Enforces Google Identity + Context-Aware Access (`device posture, corp IP, geo`) at the load balancer / App Engine / Cloud Run layer **before** internal employee/contractor requests ever hit your app.",
        "whenToChoose": [
          "**Public customers / external APIs:** **Global/Regional External Application LB + Cloud Armor** (with `--ingress=internal-and-cloud-load-balancing` on Cloud Run!).",
          "**Employees / contractors accessing internal web dashboards from anywhere without VPN:** **External ALB + Cloud IAP + Context-Aware Access**."
        ],
        "examTrap": "Never deploy client VPN software to 5,000 remote employees/contractors just to view an internal HTTPS web portal — **Cloud IAP** gives BeyondCorp zero-trust access with zero VPN concentrator management!",
        "exampleQ": {
          "stem": "Remote employees and third-party auditors working from unmanaged laptops and corporate Chromebooks need secure HTTPS access to an internal GKE financial portal without deploying client VPN software.",
          "why": "Expose the GKE Ingress behind an External Application Load Balancer protected by Cloud IAP and Context-Aware Access levels."
        }
      }
    ]
  }
];
