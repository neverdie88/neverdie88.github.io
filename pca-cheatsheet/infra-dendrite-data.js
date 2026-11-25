window.GCP_INFRA_DENDRITE = {
  "soma": {
    "title": "Hybrid & Cloud Estate",
    "subtitle": "Where Every Workload & Service Physically Lives"
  },
  "trunks": [
    {
      "id": "z1-customer-vpc",
      "code": "Z1",
      "shortTitle": "Your Customer VPC & Subnets",
      "title": "Z1. Inside YOUR Customer VPC & Subnets",
      "subtitle": "Resources with NICs / VIPs directly inside your regional RFC 1918 subnets",
      "color": "#2563eb",
      "bgTint": "#eff6ff",
      "branches": [
        {
          "id": "z1-vms-workers",
          "code": "1A",
          "title": "Compute VMs, Sole-Tenant Nodes & Cluster Workers",
          "badge": "Direct Subnet NICs · Ch 06, 29, 30",
          "summary": "Virtual machines and data-processing workers whose network interfaces sit directly inside your VPC subnet CIDR.",
          "spines": [
            {
              "kind": "svc",
              "label": "🏠 Compute Engine VMs, Managed Instance Groups (MIGs), Spot VMs & Sole-Tenant Nodes (physical host, VMs still sit in your VPC!)"
            },
            {
              "kind": "svc",
              "label": "🏠 Dataproc Cluster VMs (Spark/Hadoop), Dataflow Worker VMs, App Engine Flexible Docker VMs & Vertex AI Workbench (User VPC)"
            },
            {
              "kind": "bridge",
              "label": "🔌 IP & Security: Draws RFC 1918 IPs from your Regional Subnet; governed by VPC Routes, VPC Firewall Rules & VPC Flow Logs"
            },
            {
              "kind": "trap",
              "label": "⚠️ TRAP: App Engine Flexible runs Docker on GCE VMs inside Z1 Customer VPC, whereas App Engine Standard runs in Z3 Serverless Sandbox!"
            }
          ]
        },
        {
          "id": "z1-gke-dataplane",
          "code": "1B",
          "title": "GKE Worker Nodes & VPC-Native Alias-IP Pods",
          "badge": "K8s Data Plane in Your VPC · Ch 07",
          "summary": "All Kubernetes worker nodes and Pod IP addresses in VPC-native GKE clusters live directly inside your VPC subnet.",
          "spines": [
            {
              "kind": "svc",
              "label": "🏠 GKE Standard Node Pools & GKE Autopilot Nodes/Pods (all container workloads execute inside your VPC subnet!)"
            },
            {
              "kind": "bridge",
              "label": "🔌 VPC-Native (Alias IPs): Primary subnet range = Nodes · Secondary range #1 = Pod IPs · Secondary range #2 = ClusterIP Services"
            },
            {
              "kind": "trap",
              "label": "⚠️ SPLIT-BRAIN: GKE Nodes & Pods live in Z1 Customer VPC, while the GKE Control Plane (kube-apiserver) lives in Z2 Google Tenant VPC!"
            }
          ]
        },
        {
          "id": "z1-vpc-endpoints-gateways",
          "code": "1C",
          "title": "Internal Load Balancers, PSC Endpoints & VPC Gateways",
          "badge": "VPC Entry/Exit Doors · Ch 14, 15, 17, 19",
          "summary": "Virtual IPs, NAT gateways, VPN/BGP routers, and serverless egress legs living inside your VPC.",
          "spines": [
            {
              "kind": "svc",
              "label": "🏠 Internal Application LB (L7) & Internal Passthrough/Proxy NLB (L4) VIPs + Regional Proxy-Only Subnets"
            },
            {
              "kind": "svc",
              "label": "🏠 Private Service Connect (PSC) Consumer Endpoints (/32 subnet IP) · Direct VPC Egress NICs · Serverless VPC Connector (/28 VMs)"
            },
            {
              "kind": "svc",
              "label": "🏠 Cloud Router (BGP control plane) · HA VPN Gateways · Cloud NAT (outbound-only SNAT) · Secure Web Proxy"
            }
          ]
        }
      ]
    },
    {
      "id": "z2-tenant-vpc",
      "code": "Z2",
      "shortTitle": "Google Tenant VPC (Memorystore / SQL)",
      "title": "Z2. Google-Managed Tenant / Producer VPCs",
      "subtitle": "Why people say \"Memorystore / Cloud SQL lives in VPC\" — private-IP services hosted in a Google Tenant VPC peered/PSC-linked to Z1!",
      "color": "#7c3aed",
      "bgTint": "#f5f3ff",
      "branches": [
        {
          "id": "z2-memorystore-filestore",
          "code": "2A",
          "title": "Memorystore, Filestore & NetApp Volumes (Private-IP Tenant VPC)",
          "badge": "PSA Peering or PSC · Ch 06, 26",
          "summary": "In-memory caches and shared NFS/SMB file servers have NO public internet endpoints — Google runs them in a dedicated Tenant VPC attached to your VPC.",
          "spines": [
            {
              "kind": "svc",
              "label": "🏠 Memorystore (Redis, Redis Cluster, Valkey, Memcached) — 100% private RFC 1918 IP; NEVER exposed on *.googleapis.com or public internet!"
            },
            {
              "kind": "svc",
              "label": "🏠 Filestore (Managed NFS shares) & Google Cloud NetApp Volumes (NFS/SMB) — mounted via private Tenant VPC IP"
            },
            {
              "kind": "bridge",
              "label": "🔌 Bridge to Z1: Private Services Access (PSA allocates /16–/24 & peers Google Tenant VPC to Z1) OR Private Service Connect (PSC)!"
            },
            {
              "kind": "trap",
              "label": "⚠️ HUGE EXAM TRAP: Because PSA uses VPC Peering into Z2, another Spoke VPC peered to Z1 CANNOT reach Memorystore (non-transitive -> use PSC or Shared VPC)!"
            }
          ]
        },
        {
          "id": "z2-cloudsql-alloydb",
          "code": "2B",
          "title": "Cloud SQL (Private IP) & AlloyDB for PostgreSQL",
          "badge": "Managed DB Tenant VPC · Ch 23, 24",
          "summary": "Regional relational database instances running inside Google-managed single-tenant producer VPCs.",
          "spines": [
            {
              "kind": "svc",
              "label": "🏠 AlloyDB for PostgreSQL (Primary & Read Pools) & Cloud SQL Private IP (MySQL, PostgreSQL, SQL Server)"
            },
            {
              "kind": "bridge",
              "label": "🔌 Bridge to Z1: PSA VPC Peering (/16–/24 reserved range) OR PSC Service Attachment (solves overlapping CIDRs & cross-VPC access!)"
            },
            {
              "kind": "trap",
              "label": "⚠️ HYBRID TRAP: On-Premises (Z6) cannot reach Cloud SQL / AlloyDB / Memorystore (Z2) unless Cloud Router enables \"Export custom routes\"!"
            }
          ]
        },
        {
          "id": "z2-control-planes-runtimes",
          "code": "2C",
          "title": "GKE Control Plane, Apigee X, Composer & Private AI Jobs",
          "badge": "Managed Control & Runtime VPCs · Ch 07, 39, 41",
          "summary": "Managed control planes and isolated single-tenant execution environments operated by Google.",
          "spines": [
            {
              "kind": "svc",
              "label": "🏠 GKE Control Plane (kube-apiserver) · Apigee X Runtime Plane · Cloud Composer (Airflow) · Looker (Google Cloud Core Private IP)"
            },
            {
              "kind": "svc",
              "label": "🏠 Vertex AI Custom Training Jobs & Private Prediction Endpoints · Cloud Build Private Pools · Datastream Private Connectivity"
            },
            {
              "kind": "bridge",
              "label": "🔌 Bridge to Z1: Modern GKE Control Plane, Apigee X & Vertex Private Endpoints use PSC (zero peering quota!) or PSA Peering"
            }
          ]
        }
      ]
    },
    {
      "id": "z3-google-multitenant",
      "code": "Z3",
      "shortTitle": "Google Cloud Infra (*.googleapis.com & Run)",
      "title": "Z3. Google Multi-Tenant Cloud Infrastructure (Outside Any VPC!)",
      "subtitle": "Runs on Google’s Borg / Colossus / Spanner fabric — NO customer VPC subnet & NO RFC 1918 IP by default!",
      "color": "#0891b2",
      "bgTint": "#ecfeff",
      "branches": [
        {
          "id": "z3-data-storage-apis",
          "code": "3A",
          "title": "Global Storage, BigQuery, Spanner, NoSQL & Security APIs",
          "badge": "*.googleapis.com Fabric · Ch 20, 21, 22, 25, 27, 28",
          "summary": "Multi-tenant Google Cloud services accessed via HTTPS/gRPC APIs rather than VPC subnet IPs.",
          "spines": [
            {
              "kind": "svc",
              "label": "☁️ Cloud Storage (GCS) · BigQuery · Cloud Spanner · Cloud Bigtable · Firestore · Dataplex"
            },
            {
              "kind": "svc",
              "label": "☁️ Pub/Sub · Artifact Registry · Secret Manager · Cloud KMS / HSM · Cloud Logging & Monitoring"
            },
            {
              "kind": "bridge",
              "label": "🔌 Private Reach from Z1/Z6: Enable Private Google Access (PGA -> 199.36.153.8/30 or 199.36.153.4/30) or a PSC Google APIs Endpoint!"
            },
            {
              "kind": "trap",
              "label": "⚠️ SECURITY TRAP: VPC Firewall Rules DO NOT protect Z3 multi-tenant APIs — use IAM + VPC Service Controls (VPC-SC) to stop data exfiltration!"
            }
          ]
        },
        {
          "id": "z3-ai-managed-apis",
          "code": "3B",
          "title": "Vertex AI Managed APIs, Model Garden & Pre-trained AI APIs",
          "badge": "Google AI / TPU Fabric · Ch 40, 41, 45",
          "summary": "Serverless GenAI, foundation models, and turnkey AI APIs running on Google’s AI Hypercomputer fleet.",
          "spines": [
            {
              "kind": "svc",
              "label": "☁️ Vertex AI Gemini / Imagen / Model Garden MaaS APIs · AutoML · Feature Store · Pipelines · Colab Enterprise"
            },
            {
              "kind": "svc",
              "label": "☁️ Pre-trained Cloud AI APIs (Document AI, Vision, Speech/Chirp 3, Translation, Video) · Gemini Enterprise · NotebookLM"
            },
            {
              "kind": "bridge",
              "label": "🔌 Lock down sensitive prompts & RAG buckets with VPC-SC Perimeter + restricted.googleapis.com (199.36.153.4/30) + Model Armor!"
            }
          ]
        },
        {
          "id": "z3-serverless-compute",
          "code": "3C",
          "title": "Serverless Compute Sandbox (Cloud Run, Functions & App Engine Std)",
          "badge": "Google Serverless Infra · Ch 08, 10, 11, 14",
          "summary": "Container and function runtimes executing on Google’s serverless fleet outside your VPC unless bridged.",
          "spines": [
            {
              "kind": "svc",
              "label": "☁️ Cloud Run (Services & Jobs) · Cloud Run functions (2nd Gen) · App Engine Standard · Workflows · Cloud Tasks & Scheduler"
            },
            {
              "kind": "bridge",
              "label": "🔌 Reaching Z1/Z2 (e.g. Cloud Run -> Memorystore or Private Cloud SQL): Attach Direct VPC Egress (default) or Serverless VPC Connector (/28)!"
            },
            {
              "kind": "trap",
              "label": "⚠️ EXAM TRAP: Cloud Run (Z3) reaches BigQuery/GCS/Firestore (Z3) natively, but CANNOT reach Memorystore (Z2) without Direct VPC Egress / Connector!"
            }
          ]
        }
      ]
    },
    {
      "id": "z4-google-edge",
      "code": "Z4",
      "shortTitle": "Google Global Edge PoPs (LB / CDN / Armor)",
      "title": "Z4. Google Global Edge PoPs & Anycast Front Ends",
      "subtitle": "200+ global edge locations terminating internet traffic BEFORE it enters your region or VPC",
      "color": "#d97706",
      "bgTint": "#fffbeb",
      "branches": [
        {
          "id": "z4-anycast-lb-cdn",
          "code": "4A",
          "title": "Global External Load Balancers, Cloud CDN & Cloud DNS",
          "badge": "Google Front Ends (GFE) · Ch 17, 18, 32",
          "summary": "Anycast VIPs, TLS termination, and edge caches sitting at Google’s peering edge closest to end users.",
          "spines": [
            {
              "kind": "svc",
              "label": "🌍 Global External Application LB (L7 HTTP/S) & Global External Proxy NLB (TCP/SSL) on Google Front Ends (GFE)"
            },
            {
              "kind": "svc",
              "label": "🌍 Cloud CDN & Media CDN (edge cache) · Cloud DNS (Anycast authoritative DNS) · Certificate Manager"
            },
            {
              "kind": "bridge",
              "label": "🔌 Routes from Z4 Edge -> Z1 (MIGs/GKE Zonal NEGs), Z3 (Cloud Run Serverless NEGs / GCS buckets), or Z6 On-Prem (Hybrid NEGs)!"
            }
          ]
        },
        {
          "id": "z4-armor-iap",
          "code": "4B",
          "title": "Cloud Armor (Edge WAF/DDoS) & Cloud IAP (Zero-Trust Proxy)",
          "badge": "Edge Defense & BeyondCorp · Ch 35, 38",
          "summary": "Drops volumetric DDoS and unauthenticated users at Google’s global edge before packets touch your VPC.",
          "spines": [
            {
              "kind": "svc",
              "label": "🌍 Cloud Armor (Edge L3/L4 DDoS mitigation + L7 OWASP WAF + Adaptive Protection + reCAPTCHA Enterprise)"
            },
            {
              "kind": "svc",
              "label": "🌍 Cloud Identity-Aware Proxy (IAP): Authenticates users at Google Edge & tunnels SSH/RDP/HTTPS into Z1 (allow 35.235.240.0/20)!"
            },
            {
              "kind": "trap",
              "label": "⚠️ TRAP: Passthrough NLBs forward packets straight into Z1 VMs without GFE termination — use Global External ALB + Cloud Armor for edge WAF!"
            }
          ]
        }
      ]
    },
    {
      "id": "z5-dedicated-pods",
      "code": "Z5",
      "shortTitle": "Dedicated Physical Pods in Google DC",
      "title": "Z5. Dedicated Hardware Extensions in Google Facilities",
      "subtitle": "Single-tenant physical VMware / Bare Metal racks inside Google regions — outside standard GCE VPC, bridged into Z1",
      "color": "#059669",
      "bgTint": "#ecfdf5",
      "branches": [
        {
          "id": "z5-gcve",
          "code": "5A",
          "title": "Google Cloud VMware Engine (GCVE Private Cloud)",
          "badge": "Dedicated vSphere Pod · Ch 49",
          "summary": "Dedicated bare-metal ESXi hosts running vCenter, vSAN, NSX-T, and HCX inside a Google Cloud data center.",
          "spines": [
            {
              "kind": "svc",
              "label": "🏢 GCVE Private Cloud: Dedicated physical ESXi nodes + vCenter + vSAN + NSX-T overlay subnets + HCX Cloud Manager"
            },
            {
              "kind": "bridge",
              "label": "🔌 Connects to Z1 Customer VPC via VMware Engine Network + Private Services Access (PSA) & to Z6 On-Prem via Cloud Interconnect + HCX!"
            },
            {
              "kind": "trap",
              "label": "⚠️ NUANCE: GCVE (Z5) is a separate VMware NSX network bridged into Z1, whereas GCE Sole-Tenant Nodes sit directly inside Z1 subnets!"
            }
          ]
        },
        {
          "id": "z5-bare-metal",
          "code": "5B",
          "title": "Bare Metal Solution (Oracle / SAP) & Oracle Database@Google Cloud",
          "badge": "Regional Extension Pod · Ch 49",
          "summary": "Certified non-virtualized physical servers (no Google hypervisor!) for bring-your-own-license Oracle RAC & SAP HANA.",
          "spines": [
            {
              "kind": "svc",
              "label": "🏢 Bare Metal Solution physical servers (Oracle RAC, SAP HANA) & Exadata hardware in Oracle Database@Google Cloud"
            },
            {
              "kind": "bridge",
              "label": "🔌 Bridged into Z1 Customer VPC at <2 ms latency over Google-managed Partner Interconnect / Cloud Router / VRF fabric!"
            }
          ]
        }
      ]
    },
    {
      "id": "z6-on-premises",
      "code": "Z6",
      "shortTitle": "On-Premises Data Center & Edge",
      "title": "Z6. On-Premises Customer Data Center & Edge Sites",
      "subtitle": "What physically runs in YOUR building, colocation cage, or factory — including Google appliances & GDC!",
      "color": "#dc2626",
      "bgTint": "#fef2f2",
      "branches": [
        {
          "id": "z6-customer-workloads",
          "code": "6A",
          "title": "Customer Legacy Servers, VMware vSphere, DBs, NAS & Active Directory",
          "badge": "Your Data Center · Ch 04, 15, 16, 49",
          "summary": "Existing customer-owned infrastructure that communicates with or migrates into Google Cloud.",
          "spines": [
            {
              "kind": "svc",
              "label": "🏭 On-Prem VMware vSphere (ESXi + vCenter + HCX Connector) · Legacy Mainframes · Physical Linux/Windows Servers"
            },
            {
              "kind": "svc",
              "label": "🏭 Self-Managed Oracle / SQL Server / Postgres · On-Prem SAN & NAS (NFS/SMB) · Active Directory + GCDS / SAML IdP"
            },
            {
              "kind": "bridge",
              "label": "🔌 Uses your corporate RFC 1918 IP space; extends to Z1 VPC via HA VPN or Dedicated/Partner Interconnect + Cloud Router!"
            }
          ]
        },
        {
          "id": "z6-google-onprem-agents",
          "code": "6B",
          "title": "Google Distributed Cloud, AlloyDB Omni & Physical/Software Agents On-Prem",
          "badge": "Google Tech Running On-Prem! · Ch 07, 20, 24, 48, 49",
          "summary": "Google-built clusters, databases, hardware appliances, and collectors that execute physically INSIDE your premises!",
          "spines": [
            {
              "kind": "svc",
              "label": "🏭 GKE Distributed Cloud (GKE on VMware & GKE on Bare Metal) · Google Distributed Cloud (GDC Edge / Air-Gapped) · AlloyDB Omni"
            },
            {
              "kind": "svc",
              "label": "🏭 Transfer Appliance (40 TB / 300 TB physical box racked on-prem) · Backup and DR On-Premises Recovery Appliance"
            },
            {
              "kind": "svc",
              "label": "🏭 Storage Transfer Service (STS) On-Premises Docker Agent Pool · Migration Center Discovery Collector · Migrate to VMs Connector"
            },
            {
              "kind": "trap",
              "label": "⚠️ EXAM FAVORITE: Even though these are Google products, they run PHYSICALLY inside Z6 On-Premises and connect outbound to Z3/Z1!"
            }
          ]
        },
        {
          "id": "z6-hybrid-demarc",
          "code": "6C",
          "title": "On-Prem BGP Routers, VPN Firewalls & Colocation Cross-Connects",
          "badge": "Hybrid Demarcation · Ch 14, 15, 16, 18",
          "summary": "Physical customer networking gear terminating IPsec tunnels, fiber cross-connects, and hybrid DNS forwarding.",
          "spines": [
            {
              "kind": "svc",
              "label": "🏭 Customer On-Premises BGP Router / IPsec VPN Appliance & Colocation Cage Fiber Cross-Connect (10G / 100G)"
            },
            {
              "kind": "bridge",
              "label": "🔌 Hybrid DNS & Private APIs: On-prem DNS forwards *.googleapis.com -> 199.36.153.8/30 (PGA for On-Prem) & GCP zones -> 35.199.192.0/19!"
            }
          ]
        }
      ]
    }
  ],
  "lenses": [
    {
      "id": "lens-memorystore-sql",
      "label": "🧠 Where Do Memorystore, Cloud SQL, AlloyDB & Filestore Actually Live?",
      "branchIds": [
        "z1-vms-workers",
        "z1-gke-dataplane",
        "z1-vpc-endpoints-gateways",
        "z2-memorystore-filestore",
        "z2-cloudsql-alloydb",
        "z3-serverless-compute"
      ],
      "note": "Memorystore, Cloud SQL (Private IP), AlloyDB, and Filestore live in a Google-Managed Tenant VPC (Z2) peered/PSC-linked to Z1: (1) VMs (1A) & GKE Pods (1B) already inside Z1 reach them directly; (2) Cloud Run (3C in Z3) must bridge into Z1 via Direct VPC Egress (1C); and (3) another Spoke VPC peered to Z1 CANNOT reach Z2 via PSA (non-transitive peering -> use PSC or Shared VPC)!"
    },
    {
      "id": "lens-gke-split",
      "label": "☸️ GKE Split-Brain Residency (Control Plane in Z2 vs Nodes/Pods in Z1)",
      "branchIds": [
        "z1-gke-dataplane",
        "z2-control-planes-runtimes"
      ],
      "note": "In GKE, your Worker Nodes and VPC-native Alias-IP Pods live directly inside YOUR VPC subnet (Z1), whereas the Kubernetes Control Plane (kube-apiserver) lives in a Google-managed Tenant VPC (Z2) connected via PSC or VPC Peering!"
    },
    {
      "id": "lens-serverless-bridges",
      "label": "⚡ Cloud Run / Functions (Z3) ↔ Memorystore/SQL (Z2) & BigQuery/GCS (Z3)",
      "branchIds": [
        "z3-serverless-compute",
        "z3-data-storage-apis",
        "z1-vpc-endpoints-gateways",
        "z2-memorystore-filestore"
      ],
      "note": "Cloud Run & Cloud Run functions execute in Google’s Multi-Tenant Serverless Sandbox (Z3). They reach BigQuery, GCS, Spanner & Firestore (also Z3) directly — but to reach VMs (Z1) or Memorystore / Private Cloud SQL (Z2), they MUST enter Z1 via Direct VPC Egress or a Serverless VPC Access Connector!"
    },
    {
      "id": "lens-security-boundaries",
      "label": "🛡️ Which Firewall/Perimeter Protects Which Zone? (Z1 vs Z3 vs Z4)",
      "branchIds": [
        "z1-vms-workers",
        "z3-data-storage-apis",
        "z4-armor-iap"
      ],
      "note": "Z1 (Your VPC NICs) = protected by VPC Firewall Rules & Cloud NGFW. Z3 (Multi-tenant *.googleapis.com like BigQuery, GCS, Vertex AI) = VPC Firewalls DO NOTHING here; use IAM + VPC Service Controls (VPC-SC)! Z4 (Global Edge LB) = protected by Cloud Armor WAF/DDoS + Cloud IAP!"
    },
    {
      "id": "lens-vmware-oracle",
      "label": "🏢 Hybrid VMware & Oracle: On-Prem (Z6) ↔ Dedicated Pods (Z5) ↔ Your VPC (Z1)",
      "branchIds": [
        "z6-customer-workloads",
        "z5-gcve",
        "z5-bare-metal",
        "z1-vpc-endpoints-gateways"
      ],
      "note": "GCVE (VMware Engine) and Bare Metal Solution (Oracle/SAP) run on dedicated single-tenant physical servers in Z5 inside Google facilities — bridged privately to Z1 Customer VPC (PSA / Partner Interconnect) and stretched to Z6 On-Premises via Cloud Interconnect + HCX!"
    },
    {
      "id": "lens-google-onprem",
      "label": "🏭 Google Products That Physically Run On-Premises (Z6)!",
      "branchIds": [
        "z6-google-onprem-agents",
        "z6-hybrid-demarc"
      ],
      "note": "GKE on Bare Metal / VMware, Google Distributed Cloud (GDC Connected & Air-Gapped), AlloyDB Omni, Transfer Appliance, Backup & DR Recovery Appliance, STS Docker Agents, and Migration Center Collectors all run PHYSICALLY inside your Z6 On-Premises data center!"
    }
  ]
};
