window.GCP_COMPONENT_CONNECTIVITY = {
  "soma": {
    "title": "Component ↔ Component",
    "subtitle": "Source ──[Exact Bridge Chain]──▶ Target"
  },
  "trunks": [
    {
      "id": "c1-internet-src",
      "code": "C1",
      "shortTitle": "Internet / Partner ──▶ GCP",
      "title": "C1. Internet User / Partner ──▶ GCP Components",
      "direction": "External Browser, Mobile App, Admin Laptop or B2B Partner Inbound",
      "color": "#ea580c",
      "bgTint": "#fff7ed",
      "branches": [
        {
          "id": "c1-to-serverless",
          "code": "1A",
          "fromId": "internet",
          "toId": "cloud-run",
          "hopChain": [
            "Internet User",
            "Global External ALB + Cloud Armor (Z4 Edge)",
            "Serverless NEG",
            "Cloud Run / Functions (ingress: internal-and-cloud-load-balancing)"
          ],
          "title": "Internet Client ──▶ Cloud Run / Functions / App Engine",
          "badge": "Global ALB + Serverless NEG · Ch 08, 17, 35",
          "summary": "Expose serverless containers/functions globally behind a custom domain, Anycast IP, CDN, and Cloud Armor WAF while blocking direct *.run.app bypass.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 Hop Chain: [Client] ──▶ [Global External ALB + Cloud Armor] ──▶ [Serverless NEG] ──▶ [Cloud Run / Function]"
            },
            {
              "kind": "ip",
              "label": "🔒 Lock Down Bypass: Set Cloud Run ingress = \"internal-and-cloud-load-balancing\" so users CANNOT bypass Cloud Armor via *.run.app!"
            },
            {
              "kind": "trap",
              "label": "⚠️ TRAP: Need API keys/lightweight OpenAPI auth without LB? Use API Gateway; need monetization/developer portal? Use Apigee X!"
            }
          ]
        },
        {
          "id": "c1-to-vms-gke",
          "code": "1B",
          "fromId": "internet",
          "toId": "gce-gke",
          "hopChain": [
            "Internet User",
            "Global External ALB (L7) or Proxy/Passthrough NLB (L4)",
            "Zonal / Container-Native NEG (or MIG)",
            "Private GCE VMs / GKE Pods"
          ],
          "title": "Internet Client ──▶ Private GCE MIGs / GKE Pods",
          "badge": "ALB / NLB -> Private Backends · Ch 07, 17",
          "summary": "Terminate HTTP(S) or TCP/TLS at Google’s edge and route over Google’s fabric to private VMs or GKE Pod IPs with zero public IPs on nodes.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 L7 HTTP(S): [Client] ──▶ [Global External ALB + Armor + CDN] ──▶ [Container-Native NEG / MIG] ──▶ [GKE Pod IP / Private VM]"
            },
            {
              "kind": "ip",
              "label": "🔗 L4 Non-HTTP: Global TCP/SSL Proxy NLB (anycast TLS/TCP offload) OR Regional Passthrough NLB (UDP/gaming/preserve client IP)"
            },
            {
              "kind": "trap",
              "label": "⚠️ FIREWALL RULE: Allow Google Health Check probes (35.191.0.0/16 & 130.211.0.0/22) to reach your Z1 VMs/Pods or backends mark UNHEALTHY!"
            }
          ]
        },
        {
          "id": "c1-to-gcs",
          "code": "1C",
          "fromId": "internet",
          "toId": "gcs-bq",
          "hopChain": [
            "Internet User",
            "Global External ALB + Cloud CDN (or Signed URL)",
            "Backend Bucket",
            "Cloud Storage Bucket"
          ],
          "title": "Internet Client ──▶ Cloud Storage Bucket (Static Web / Media / Uploads)",
          "badge": "Backend Bucket + CDN or Signed URL · Ch 20, 32",
          "summary": "Serve cached global static assets or grant temporary direct upload/download access to private GCS objects without Google accounts.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 Public/CDN Path: [Client] ──▶ [Global External ALB + Cloud CDN] ──▶ [Backend Bucket] ──▶ [Cloud Storage]"
            },
            {
              "kind": "ip",
              "label": "🔗 Direct Private Object Upload/Download: App issues time-limited V4 Signed URL -> Client PUTs/GETs directly to storage.googleapis.com!"
            },
            {
              "kind": "trap",
              "label": "⚠️ TRAP: Never stream multi-GB user uploads through Cloud Run/GKE RAM — issue a GCS Signed URL so clients upload directly to GCS!"
            }
          ]
        },
        {
          "id": "c1-admin-iap",
          "code": "1D",
          "fromId": "internet",
          "toId": "ssh-admin",
          "hopChain": [
            "Admin / Engineer Laptop",
            "Cloud Identity + Context-Aware Access",
            "Cloud IAP Proxy (35.235.240.0/20)",
            "Private GCE VM (SSH 22 / RDP 3389) or Internal Web App"
          ],
          "title": "Admin / Employee ──▶ Private VM SSH/RDP or Internal App (Zero-Trust)",
          "badge": "Cloud IAP · Zero Bastion / Zero VPN · Ch 38",
          "summary": "Authenticate identity & device posture at Google’s edge and tunnel into private VMs or internal web apps with no public IPs.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 Hop Chain: [gcloud compute ssh --tunnel-through-iap] ──▶ [Cloud IAP Edge Proxy] ──▶ [VPC Firewall allow 35.235.240.0/20] ──▶ [Private VM]"
            },
            {
              "kind": "ip",
              "label": "🔑 Required IAM + Firewall: Grant roles/iap.tunnelResourceAccessor + VPC ingress rule allowing TCP 22/3389 ONLY from 35.235.240.0/20!"
            },
            {
              "kind": "trap",
              "label": "⚠️ TRAP: Do NOT deploy public jump-box / bastion VMs or open 0.0.0.0/0 port 22 when Cloud IAP TCP forwarding is an option!"
            }
          ]
        }
      ]
    },
    {
      "id": "c2-vm-gke-src",
      "code": "C2",
      "shortTitle": "Private VM / GKE ──▶ ...",
      "title": "C2. Private GCE VM / GKE Pod (VPC-A) ──▶ Target Components",
      "direction": "Outbound from RFC 1918 Workloads Inside Your Customer VPC Subnet (No Public IP)",
      "color": "#2563eb",
      "bgTint": "#eff6ff",
      "branches": [
        {
          "id": "c2-to-google-apis",
          "code": "2A",
          "fromId": "gce-gke",
          "toId": "gcs-bq",
          "hopChain": [
            "Private VM / GKE Pod (No External IP)",
            "Subnet Private Google Access (PGA = ON)",
            "Default Route -> Next-Hop Default Internet Gateway (Google Backbone)",
            "GCS / BigQuery / Spanner / Pub/Sub / KMS (*.googleapis.com)"
          ],
          "title": "Private VM / GKE Pod ──▶ GCS / BigQuery / Spanner / Pub/Sub / Vertex APIs",
          "badge": "Private Google Access (PGA) · Free · Ch 14 · L07 ⚠️",
          "summary": "Reach multi-tenant Google Cloud APIs over Google’s internal backbone without assigning external IPs or paying for Cloud NAT.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 Hop Chain: [Private VM/Pod] ──▶ [Subnet PGA = ON] ──▶ [199.36.153.8/30 private.googleapis.com (or 199.36.153.4/30 with VPC-SC)] ──▶ [Google API]"
            },
            {
              "kind": "ip",
              "label": "🔌 Alternative: Create a Private Service Connect (PSC) Endpoint for Google APIs inside your VPC for a custom internal IP (e.g. 10.0.0.50)!"
            },
            {
              "kind": "trap",
              "label": "⚠️ TRAP: You do NOT need Cloud NAT to reach Cloud Storage or BigQuery from private VMs — enable Subnet Private Google Access for $0!"
            }
          ]
        },
        {
          "id": "c2-to-memorystore-sql",
          "code": "2B",
          "fromId": "gce-gke",
          "toId": "memorystore-sql",
          "hopChain": [
            "Private VM / GKE Pod (VPC-A)",
            "PSA VPC Peering (/16–/24) OR PSC Endpoint (/32)",
            "Google Tenant Producer VPC (Z2)",
            "Memorystore / Cloud SQL / AlloyDB / Filestore"
          ],
          "title": "Private VM / GKE Pod ──▶ Memorystore / Cloud SQL / AlloyDB / Filestore",
          "badge": "PSA Peering or PSC Endpoint · Ch 14, 23, 24, 26",
          "summary": "Connect from your VPC subnet to Google-managed stateful services running inside dedicated Google Tenant VPCs.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 Classic Path (PSA): [VM / GKE Pod] ──▶ [Allocated /16–/24 Internal Range + servicenetworking VPC Peering] ──▶ [Cloud SQL / Memorystore / Filestore]"
            },
            {
              "kind": "ip",
              "label": "🔗 Modern Path (PSC): [VM / GKE Pod] ──▶ [PSC Consumer Endpoint (/32 IP in your subnet)] ──▶ [PSC Service Attachment on AlloyDB / Cloud SQL / Memorystore]!"
            },
            {
              "kind": "trap",
              "label": "⚠️ NON-TRANSITIVE TRAP: If VM is in Spoke VPC-B peered to Hub VPC-A, it CANNOT reach VPC-A’s PSA Memorystore/SQL — use PSC Endpoint in VPC-B!"
            }
          ]
        },
        {
          "id": "c2-to-internet",
          "code": "2C",
          "fromId": "gce-gke",
          "toId": "internet",
          "hopChain": [
            "Private VM / GKE Pod (No External IP)",
            "Regional Cloud NAT (on Cloud Router) OR Secure Web Proxy",
            "Internet Gateway",
            "GitHub / apt / PyPI / 3rd-Party HTTPS API"
          ],
          "title": "Private VM / GKE Pod ──▶ External Internet (apt / GitHub / External Webhooks)",
          "badge": "Cloud NAT or Secure Web Proxy · Ch 18",
          "summary": "Allow outbound OS patching and webhook calls from private VMs/GKE nodes while keeping zero inbound internet reachability.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 L3/L4 Outbound SNAT: [Private VM / GKE Pod] ──▶ [Cloud NAT (paired with Cloud Router)] ──▶ [External Repo / Partner IP]"
            },
            {
              "kind": "ip",
              "label": "🔗 L7 FQDN Filtering: Need to allow ONLY \"github.com\" & \"pypi.org\" by domain/TLS? Route via Secure Web Proxy instead of L3 IPs!"
            },
            {
              "kind": "trap",
              "label": "⚠️ TRAP: Cloud NAT is strictly OUTBOUND-INITIATED — external clients can NEVER initiate inbound connections through Cloud NAT!"
            }
          ]
        },
        {
          "id": "c2-to-cloudrun",
          "code": "2D",
          "fromId": "gce-gke",
          "toId": "cloud-run",
          "hopChain": [
            "Private VM / GKE Pod",
            "Subnet PGA ON (or Internal ALB + Serverless NEG)",
            "Google Backbone",
            "Cloud Run (ingress: internal)"
          ],
          "title": "Private VM / GKE Pod ──▶ Internal-Only Cloud Run / Function",
          "badge": "PGA or Internal ALB + Serverless NEG · Ch 08, 17",
          "summary": "Call an internal microservice on Cloud Run privately without traversing the public internet.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 Direct Path: Enable Subnet PGA ON -> VM calls *.run.app (ingress: internal) with Service Account OIDC ID Token over Google backbone!"
            },
            {
              "kind": "ip",
              "label": "🔗 RFC 1918 Private Domain/VIP Path: [VM / On-Prem] ──▶ [Internal Application LB (10.x.x.x VIP)] ──▶ [Serverless NEG] ──▶ [Cloud Run]!"
            }
          ]
        }
      ]
    },
    {
      "id": "c3-serverless-src",
      "code": "C3",
      "shortTitle": "Cloud Run / Functions ──▶ ...",
      "title": "C3. Serverless (Cloud Run / Functions / App Engine Std) ──▶ Targets",
      "direction": "Outbound from Google’s Multi-Tenant Serverless Sandbox (Z3) to VPC, Tenant VPC, APIs & On-Prem",
      "color": "#7c3aed",
      "bgTint": "#f5f3ff",
      "branches": [
        {
          "id": "c3-to-memorystore-sql",
          "code": "3A",
          "fromId": "cloud-run",
          "toId": "memorystore-sql",
          "hopChain": [
            "Cloud Run / Function (Z3 Sandbox)",
            "Direct VPC Egress (or /28 VPC Connector)",
            "Customer VPC Subnet (Z1)",
            "PSA Peering or PSC Endpoint",
            "Memorystore / Cloud SQL Private IP / AlloyDB (Z2)"
          ],
          "title": "Cloud Run / Function ──▶ Memorystore / Cloud SQL (Private IP) / AlloyDB",
          "badge": "⚠️ PCA v6.1 Star · Direct VPC Egress · Ch 14 · L09",
          "summary": "Bridge serverless containers out of Google’s Z3 sandbox into your Z1 VPC so they can reach private-IP caches & databases in Z2.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 Preferred 2026 Hop Chain: [Cloud Run] ──▶ [Direct VPC Egress (subnet IP, 0 proxy VMs!)] ──▶ [Customer VPC] ──▶ [PSA / PSC] ──▶ [Memorystore / AlloyDB / SQL]"
            },
            {
              "kind": "ip",
              "label": "🔗 Legacy/AppEngine Std Alternative: [App Engine Std / Gen1 Function] ──▶ [Serverless VPC Access Connector (/28 e2-micro VMs)] ──▶ [Customer VPC]"
            },
            {
              "kind": "trap",
              "label": "⚠️ Architecture Note: Prefer Direct VPC Egress over Serverless VPC Connector for Cloud Run — lower latency and ZERO idle /28 connector VM cost!"
            }
          ]
        },
        {
          "id": "c3-to-vms-ilb",
          "code": "3B",
          "fromId": "cloud-run",
          "toId": "gce-gke",
          "hopChain": [
            "Cloud Run / Function",
            "Direct VPC Egress (vpc-egress = private-ranges-only)",
            "Customer VPC Subnet",
            "Private GCE VM / Internal ALB / GKE ClusterIP"
          ],
          "title": "Cloud Run / Function ──▶ Private GCE VM / Internal Load Balancer / GKE",
          "badge": "Direct VPC Egress -> RFC 1918 · Ch 08, 14",
          "summary": "Send requests from Cloud Run directly to internal microservices on GCE VMs, GKE, or an Internal ALB.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 Hop Chain: [Cloud Run] ──▶ [Direct VPC Egress + network tags] ──▶ [VPC Firewall allow from subnet/tag] ──▶ [Internal ALB / GKE / VM]"
            },
            {
              "kind": "ip",
              "label": "🎯 Egress Modes: \"private-ranges-only\" (only RFC 1918 enters VPC) vs \"all-traffic\" (forces public internet egress through VPC + Cloud NAT for static IP!)"
            }
          ]
        },
        {
          "id": "c3-to-onprem",
          "code": "3C",
          "fromId": "cloud-run",
          "toId": "on-prem",
          "hopChain": [
            "Cloud Run / Function",
            "Direct VPC Egress",
            "Customer VPC Subnet",
            "Cloud Router + HA VPN / Cloud Interconnect",
            "On-Premises DB / ERP"
          ],
          "title": "Cloud Run / Function ──▶ On-Premises Database / Mainframe",
          "badge": "Direct VPC Egress + Hybrid BGP · Ch 14, 15, 16",
          "summary": "Reach corporate on-premises databases or APIs privately from serverless workloads.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 Hop Chain: [Cloud Run] ──▶ [Direct VPC Egress Subnet] ──▶ [Cloud Router BGP advertises subnet CIDR] ──▶ [HA VPN / Interconnect] ──▶ [On-Prem DB]"
            },
            {
              "kind": "trap",
              "label": "⚠️ RETURN-ROUTE TRAP: Ensure Cloud Router advertises the Direct VPC Egress subnet (/28 connector CIDR) to on-prem so reply packets route back!"
            }
          ]
        },
        {
          "id": "c3-to-google-apis",
          "code": "3D",
          "fromId": "cloud-run",
          "toId": "gcs-bq",
          "hopChain": [
            "Cloud Run / Function (Dedicated Service Account)",
            "Google Internal Production Backbone",
            "BigQuery / Cloud Storage / Spanner / Firestore / Pub/Sub"
          ],
          "title": "Cloud Run / Function ──▶ BigQuery / GCS / Spanner / Firestore / Pub/Sub",
          "badge": "Zero VPC Needed! · Native Backbone · Ch 08, 20, 21",
          "summary": "Both Cloud Run and multi-tenant Google APIs already sit in Z3 — they communicate natively over Google’s backbone using IAM!",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 Hop Chain: [Cloud Run + Least-Privilege Service Account] ──▶ [Google Internal Fabric] ──▶ [BigQuery / GCS / Pub/Sub / Spanner]"
            },
            {
              "kind": "trap",
              "label": "⚠️ DISTRACTOR TRAP: Do NOT add a Serverless VPC Connector just for Cloud Run to query BigQuery, GCS, Firestore, or Spanner!"
            }
          ]
        }
      ]
    },
    {
      "id": "c4-cross-vpc-src",
      "code": "C4",
      "shortTitle": "VPC-A ──▶ VPC-B / SaaS",
      "title": "C4. Cross-VPC & Cross-Org Component Connectivity (VPC-A ──▶ VPC-B)",
      "direction": "Connecting Components Across Different Projects, VPCs, Organizations, or Overlapping CIDRs",
      "color": "#059669",
      "bgTint": "#ecfdf5",
      "branches": [
        {
          "id": "c4-shared-vpc",
          "code": "4A",
          "fromId": "vpc-a",
          "toId": "vpc-b-same-org",
          "hopChain": [
            "Service Project A VM/GKE/Run",
            "Central Host Project Shared VPC Subnets",
            "Service Project B VM/GKE/ILB/PSA DB"
          ],
          "title": "Team A Workload ──▶ Team B Workload (Same Organization)",
          "badge": "Shared VPC · Best Practice #1 · Ch 14 · L06",
          "summary": "Centralize networking in one Host Project VPC while letting application teams deploy VMs/GKE/Run in separate Service Projects.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 Hop Chain: [Project A VM] & [Project B VM] share the SAME Host VPC -> direct L3 internal routing with 1 shared VPN/Interconnect & PSA pool!"
            },
            {
              "kind": "ip",
              "label": "🔑 Least Privilege: Network Admins own Host Project firewalls/subnets; Developers get compute.networkUser on ONLY their assigned subnet!"
            }
          ]
        },
        {
          "id": "c4-psc-service",
          "code": "4B",
          "fromId": "vpc-a",
          "toId": "vpc-b-overlap",
          "hopChain": [
            "Consumer VM/GKE/Run (VPC-A, e.g. 10.0.0.0/16)",
            "PSC Consumer Endpoint (/32 IP in VPC-A)",
            "PSC Service Attachment (NATs IP!)",
            "Producer Internal LB (VPC-B, ALSO 10.0.0.0/16!)",
            "Producer Backend / SaaS / DB"
          ],
          "title": "VPC-A Component ──▶ VPC-B Service or 3rd-Party SaaS (Overlapping CIDRs / Cross-Org)",
          "badge": "⚠️ PCA v6.1 Star · Private Service Connect (PSC) · Ch 14 · L07",
          "summary": "Publish a single service across VPCs or Organizations with unidirectional consumer->producer access, even when both VPCs use identical 10.0.0.0/16 CIDRs!",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 Hop Chain: [VPC-A Workload] ──▶ [PSC Endpoint (/32)] ──▶ [PSC Service Attachment (SNAT)] ──▶ [Producer ILB in VPC-B] ──▶ [Target Service]"
            },
            {
              "kind": "ip",
              "label": "✨ SOLVES 3 HARD PROBLEMS: (1) Overlapping RFC 1918 CIDRs, (2) Cross-Org SaaS publishing (Snowflake/Datadog/Apigee), (3) 25-peering limit!"
            },
            {
              "kind": "trap",
              "label": "⚠️ Architecture Note: PSC Endpoints are UNIDIRECTIONAL (Consumer initiates -> Producer cannot initiate back into VPC-A)!"
            }
          ]
        },
        {
          "id": "c4-peering-ncc",
          "code": "4C",
          "fromId": "vpc-a",
          "toId": "vpc-b-mesh",
          "hopChain": [
            "VPC-A Component",
            "VPC Network Peering (<25 VPCs) OR Network Connectivity Center Hub (10–250+ Spokes)",
            "VPC-B Component"
          ],
          "title": "VPC-A Component ──▶ VPC-B Component (Full L3 Subnet-to-Subnet Routing)",
          "badge": "VPC Peering vs. NCC Hub · Ch 14 · L05",
          "summary": "Full bidirectional internal IP routing across non-overlapping VPCs at Andromeda line rate.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 2–5 VPCs: [VPC-A] ──(VPC Network Peering)──▶ [VPC-B] — zero bandwidth charge for peering construct, full internal IP visibility"
            },
            {
              "kind": "ip",
              "label": "🔗 Large Scale (10–250+ VPCs + Hybrid): [Spoke VPC-A] ──▶ [Network Connectivity Center (NCC) Hub] ──▶ [Spoke VPC-B / Hybrid Spoke]!"
            },
            {
              "kind": "trap",
              "label": "⚠️ TRANSITIVITY TRAP: With VPC Peering (A<->B and B<->C), A CANNOT reach C! Use NCC Hub, Shared VPC, or PSC instead of N² peering meshes!"
            }
          ]
        }
      ]
    },
    {
      "id": "c5-onprem-src",
      "code": "C5",
      "shortTitle": "On-Prem / Cloud ──▶ GCP",
      "title": "C5. On-Premises / AWS-Azure Component ──▶ GCP Components",
      "direction": "Hybrid Data Center, VMware vSphere, or Multi-Cloud Workloads Connecting Into GCP",
      "color": "#dc2626",
      "bgTint": "#fef2f2",
      "branches": [
        {
          "id": "c5-to-vms-gke",
          "code": "5A",
          "fromId": "on-prem",
          "toId": "gce-gke",
          "hopChain": [
            "On-Prem Server / AWS-Azure VM",
            "Customer BGP Router",
            "HA VPN (3 Gbps) OR Partner/Dedicated Interconnect (10–100G)",
            "Cloud Router (eBGP)",
            "GCE VM / GKE Pod / Internal ALB"
          ],
          "title": "On-Prem / AWS-Azure Server ──▶ GCE VM / GKE Pod / Internal ALB",
          "badge": "HA VPN vs. Interconnect · 99.99% SLA · Ch 15, 16",
          "summary": "Private RFC 1918 L3 routing between corporate data centers (or AWS/Azure) and GCP VPC workloads.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 <=3 Gbps / Urgent / Encrypted: [On-Prem] ──▶ [2-Tunnel HA VPN (99.99%)] ──▶ [Cloud Router] ──▶ [GCE / GKE / Global Dynamic Routing]"
            },
            {
              "kind": "ip",
              "label": "🔗 High BW: Dedicated Interconnect (10G/100G in Google PoP, 4 VLANs across 2 metros = 99.99%) · Partner Interconnect (50M–10G, no PoP) · Cross-Cloud IC"
            },
            {
              "kind": "trap",
              "label": "⚠️ ENCRYPTION + REGIONAL MODE TRAP: Enable VPC Global Dynamic Routing so 1 Interconnect reaches ALL GCP regions; add MACsec / HA VPN over IC if encryption required!"
            }
          ]
        },
        {
          "id": "c5-to-google-apis",
          "code": "5B",
          "fromId": "on-prem",
          "toId": "gcs-bq",
          "hopChain": [
            "On-Prem Server",
            "On-Prem DNS (*.googleapis.com -> 199.36.153.8/30)",
            "HA VPN / Cloud Interconnect",
            "Cloud Router (advertises 199.36.153.8/30)",
            "Cloud Storage / BigQuery / Vertex APIs"
          ],
          "title": "On-Prem Server ──▶ Cloud Storage / BigQuery / Google APIs (Private Backbone)",
          "badge": "PGA for On-Premises · 199.36.153.8/30 · Ch 14 · L07 ⚠️",
          "summary": "Access multi-tenant Google APIs privately over VPN/Interconnect without hair-pinning through proxy VMs or ISP internet.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 Hop Chain: [On-Prem Host] ──▶ [DNS CNAME *.googleapis.com -> private.googleapis.com (199.36.153.8/30)] ──▶ [VPN/Interconnect] ──▶ [GCS / BigQuery]"
            },
            {
              "kind": "ip",
              "label": "🎯 Custom IP Option: Or create a PSC Endpoint for Google APIs (e.g. 10.10.0.50) in your VPC and advertise 10.10.0.50/32 on Cloud Router BGP!"
            },
            {
              "kind": "trap",
              "label": "⚠️ BGP TRAP: Cloud Router does NOT advertise 199.36.153.8/30 (or 199.36.153.4/30) automatically — you MUST add a Cloud Router custom route advertisement!"
            }
          ]
        },
        {
          "id": "c5-to-cloudsql-memorystore",
          "code": "5C",
          "fromId": "on-prem",
          "toId": "memorystore-sql",
          "hopChain": [
            "On-Prem App / DBA Tool",
            "HA VPN / Cloud Interconnect",
            "Cloud Router + VPC-A (\"Export custom routes\" ON on PSA Peering — OR PSC Endpoint /32)",
            "Cloud SQL / AlloyDB / Memorystore (Z2 Tenant VPC)"
          ],
          "title": "On-Prem Server ──▶ Cloud SQL / AlloyDB / Memorystore (Private IP)",
          "badge": "Export Custom Routes or PSC · Ch 14, 23, 24",
          "summary": "Connect from on-premises across your VPC into Google’s Tenant VPC where Cloud SQL, AlloyDB, and Memorystore live.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 PSA Path: [On-Prem] ──▶ [VPN/IC -> Cloud Router] ──▶ [VPC-A] ──(PSA Peering with \"Export custom routes\" = ON!)──▶ [Cloud SQL / AlloyDB / Memorystore]"
            },
            {
              "kind": "ip",
              "label": "🔗 Cleaner PSC Path: Create a PSC Endpoint (10.x.x.x/32) in VPC-A for AlloyDB/Cloud SQL -> On-Prem routes straight to that VPC-A subnet IP!"
            },
            {
              "kind": "trap",
              "label": "⚠️ CLASSIC EXAM TRAP: Without advertising the PSA range to on-prem AND enabling \"Export custom routes\" on servicenetworking peering, packets drop silently!"
            }
          ]
        },
        {
          "id": "c5-to-gcve-dns",
          "code": "5D",
          "fromId": "on-prem",
          "toId": "gcve",
          "hopChain": [
            "On-Prem vSphere + DNS",
            "Dedicated / Partner Interconnect + Cloud Router",
            "VMware Engine Network + PSA Private Connection + HCX",
            "GCVE Private Cloud (& Bidirectional Cloud DNS)"
          ],
          "title": "On-Prem vSphere & DNS ──▶ GCVE VMware Engine & Cloud DNS Private Zones",
          "badge": "Exam 1 Q41 · Interconnect + HCX + DNS · Ch 14, 49",
          "summary": "Live-migrate vSphere VMs (vMotion / L2 stretch) into GCVE and resolve private DNS names bidirectionally across hybrid networks.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 VMware Hop Chain: [On-Prem vSphere + HCX] ──▶ [Cloud Interconnect] ──▶ [VMware Engine Network + PSA] ──▶ [GCVE Private Cloud + Z1/Z3 GCP Services]"
            },
            {
              "kind": "ip",
              "label": "🔗 Hybrid DNS: On-Prem -> GCP Private DNS = Cloud DNS Inbound Server Policy · GCP -> On-Prem AD DNS = Outbound Forwarding Zone (allow 35.199.192.0/19)!"
            }
          ]
        }
      ]
    },
    {
      "id": "c6-data-ai-api-src",
      "code": "C6",
      "shortTitle": "Apigee / Dataflow / Vertex ──▶ ...",
      "title": "C6. Managed Data, AI & API Engines ──▶ Private Targets",
      "direction": "Apigee X, Dataflow, Dataproc, Datastream, Composer & Vertex AI Connecting to Backends",
      "color": "#0891b2",
      "bgTint": "#ecfeff",
      "branches": [
        {
          "id": "c6-apigee-southbound",
          "code": "6A",
          "fromId": "apigee-ai-data",
          "toId": "gce-gke",
          "hopChain": [
            "External Client -> Global ALB -> PSC NEG",
            "Apigee X Runtime (Z2 Tenant VPC)",
            "PSC Endpoint (Southbound) -> Producer Service Attachment",
            "Internal ALB -> GKE / MIG / On-Prem Hybrid NEG"
          ],
          "title": "Apigee X Runtime ──▶ Private GKE / GCE / Cloud Run / On-Prem Backends",
          "badge": "Northbound & Southbound PSC · Ch 17, 39",
          "summary": "End-to-end zero-peering private architecture into and out of Apigee X.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 Northbound (Inbound): [Internet] ──▶ [Global External ALB + Cloud Armor] ──▶ [PSC NEG] ──▶ [Apigee X Service Attachment]"
            },
            {
              "kind": "ip",
              "label": "🔗 Southbound (Outbound): [Apigee X] ──▶ [PSC Endpoint] ──▶ [Service Attachment on Customer Internal LB] ──▶ [GKE / VMs / Hybrid NEG to On-Prem]!"
            }
          ]
        },
        {
          "id": "c6-dataflow-dataproc",
          "code": "6B",
          "fromId": "apigee-ai-data",
          "toId": "gcs-bq",
          "hopChain": [
            "Dataflow / Dataproc Private Workers (--no-address in Z1 Subnet)",
            "Subnet PGA = ON + PSA/PSC",
            "BigQuery / GCS / Pub/Sub (Z3) + Cloud SQL / AlloyDB (Z2)"
          ],
          "title": "Dataflow / Dataproc / Vertex Pipelines ──▶ Private DBs, GCS & BigQuery",
          "badge": "Private Workers + PGA + PSC · Ch 29, 30, 41",
          "summary": "Run ETL, Spark, and ML training/inference privately with public IPs disabled on all worker nodes.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 Dataflow/Dataproc: Disable worker public IPs (--no-address / enablePrivateIp) + Subnet PGA ON -> reaches GCS, BigQuery & Pub/Sub privately!"
            },
            {
              "kind": "ip",
              "label": "🔗 Vertex AI Custom Jobs / Agents -> Customer VPC & Hybrid DBs: Attach PSC Interface (Network Attachment) or PSA Peering into Customer VPC!"
            },
            {
              "kind": "trap",
              "label": "⚠️ TRAP: Dataflow workers with public IPs disabled FAIL to stage jars/containers in GCS if Subnet Private Google Access (PGA) is OFF!"
            }
          ]
        },
        {
          "id": "c6-datastream-cdc",
          "code": "6C",
          "fromId": "apigee-ai-data",
          "toId": "on-prem",
          "hopChain": [
            "Datastream CDC (Google Tenant VPC)",
            "Private Connectivity (VPC Peering / PSC) -> Customer VPC",
            "HA VPN / Cloud Interconnect (Export Custom Routes)",
            "On-Prem Oracle / MySQL / PostgreSQL / SQL Server"
          ],
          "title": "Datastream / DMS (CDC) ──▶ On-Premises or Private Cloud SQL Source DB",
          "badge": "Private CDC Connectivity · Ch 21, 23, 49",
          "summary": "Stream real-time database change logs from private on-prem or VPC databases into BigQuery, Cloud SQL, or AlloyDB.",
          "spines": [
            {
              "kind": "rule",
              "label": "🔗 Hop Chain: [Datastream / DMS Tenant VPC] ──(Private Connectivity Peering / PSC)──▶ [Customer VPC] ──(HA VPN / Interconnect)──▶ [Source DB]"
            },
            {
              "kind": "trap",
              "label": "⚠️ TRANSITIVE PEERING TRAP: If Source DB is in a peered VPC or on-prem without custom route export, use a forward/reverse SSH proxy VM or HA VPN + custom routes!"
            }
          ]
        }
      ]
    }
  ],
  "fromOptions": [
    {
      "id": "internet",
      "label": "🌍 Internet User / Mobile App / Admin Laptop"
    },
    {
      "id": "gce-gke",
      "label": "🖥️ Private GCE VM / GKE Pod (Inside VPC-A)"
    },
    {
      "id": "cloud-run",
      "label": "⚡ Cloud Run / Cloud Run functions / App Engine Std"
    },
    {
      "id": "vpc-a",
      "label": "🔗 Workload in VPC-A (Cross-Project / Cross-VPC)"
    },
    {
      "id": "on-prem",
      "label": "🏢 On-Premises Server / vSphere / AWS-Azure"
    },
    {
      "id": "apigee-ai-data",
      "label": "🤖 Apigee X / Dataflow / Dataproc / Datastream / Vertex AI"
    }
  ],
  "toOptions": [
    {
      "id": "gce-gke",
      "label": "🖥️ Private GCE VM / GKE Pod / Internal ALB"
    },
    {
      "id": "cloud-run",
      "label": "⚡ Cloud Run / Cloud Run functions"
    },
    {
      "id": "memorystore-sql",
      "label": "🧠 Memorystore / Cloud SQL (Private IP) / AlloyDB / Filestore"
    },
    {
      "id": "gcs-bq",
      "label": "☁️ Cloud Storage / BigQuery / Spanner / Pub/Sub (*.googleapis.com)"
    },
    {
      "id": "on-prem",
      "label": "🏢 On-Premises DB / ERP / Mainframe"
    },
    {
      "id": "gcve",
      "label": "🏢 GCVE VMware Engine & Cloud DNS Private Zones"
    },
    {
      "id": "vpc-b-same-org",
      "label": "🔗 Another Team’s Project (Same GCP Org)"
    },
    {
      "id": "vpc-b-overlap",
      "label": "🔗 Another VPC / 3rd-Party SaaS (Overlapping CIDRs or Cross-Org)"
    },
    {
      "id": "vpc-b-mesh",
      "label": "🔗 Another VPC / 10–100+ Spoke VPCs (Non-Overlapping L3)"
    },
    {
      "id": "ssh-admin",
      "label": "🔐 Private VM SSH / RDP or Internal Web Tool (Zero-Trust)"
    },
    {
      "id": "internet",
      "label": "🌐 External Internet (GitHub / apt / PyPI / Webhooks)"
    }
  ],
  "scenarios": [
    {
      "id": "pair-run-mem",
      "label": "⚡ Cloud Run ──▶ Memorystore / AlloyDB",
      "src": "Cloud Run / Function (Z3)",
      "dst": "Memorystore / Cloud SQL / AlloyDB (Z2)",
      "branchIds": [
        "c3-to-memorystore-sql"
      ],
      "winner": "[Cloud Run] ──▶ [Direct VPC Egress (0 proxy VMs)] ──▶ [Customer VPC Subnet] ──▶ [PSA Peering or PSC Endpoint] ──▶ [Memorystore / AlloyDB]",
      "trap": "Cloud Run CANNOT reach Memorystore out-of-the-box, and Direct VPC Egress replaces legacy /28 Serverless VPC Connector VMs for most workloads!"
    },
    {
      "id": "pair-vm-gcs",
      "label": "🖥️ Private VM / GKE ──▶ BigQuery / GCS",
      "src": "Private GCE VM / GKE Pod (No External IP)",
      "dst": "Cloud Storage / BigQuery / Spanner (*.googleapis.com)",
      "branchIds": [
        "c2-to-google-apis"
      ],
      "winner": "[Private VM/Pod] ──▶ [Subnet Private Google Access (PGA = ON)] ──▶ [199.36.153.8/30 (or 199.36.153.4/30 + VPC-SC)] ──▶ [GCS / BigQuery]",
      "trap": "Do NOT deploy Cloud NAT just to reach Google APIs — Subnet PGA is $0 and stays 100% on Google’s internal backbone!"
    },
    {
      "id": "pair-vpca-overlap",
      "label": "🔗 VPC-A ──▶ VPC-B / SaaS (Overlapping 10.0.0.0/16)",
      "src": "Consumer VM / GKE in VPC-A (10.0.0.0/16)",
      "dst": "Service / DB in VPC-B or SaaS (ALSO 10.0.0.0/16)",
      "branchIds": [
        "c4-psc-service"
      ],
      "winner": "[VPC-A Workload] ──▶ [PSC Endpoint (/32 IP)] ──▶ [PSC Service Attachment (NATs IP!)] ──▶ [Producer Internal LB in VPC-B]",
      "trap": "VPC Network Peering and Shared VPC FAIL on overlapping CIDRs — Private Service Connect (PSC) is the #1 PCA v6.1 answer!"
    },
    {
      "id": "pair-onprem-sql",
      "label": "🏢 On-Prem Server ──▶ Private Cloud SQL / AlloyDB",
      "src": "On-Premises Application Server",
      "dst": "Cloud SQL / AlloyDB / Memorystore (Z2 Tenant VPC)",
      "branchIds": [
        "c5-to-cloudsql-memorystore"
      ],
      "winner": "[On-Prem] ──▶ [HA VPN / Interconnect] ──▶ [Cloud Router + Advertise PSA Range] ──▶ [VPC-A (\"Export custom routes\" ON) — OR PSC Endpoint /32] ──▶ [Cloud SQL / AlloyDB]",
      "trap": "Because Cloud SQL lives in a peered Tenant VPC (Z2), forgetting \"Export custom routes\" on PSA peering drops all hybrid packets!"
    },
    {
      "id": "pair-onprem-gcs",
      "label": "🏢 On-Prem Host ──▶ GCS / BigQuery (Private)",
      "src": "On-Premises Server (No Internet)",
      "dst": "Cloud Storage / BigQuery (*.googleapis.com)",
      "branchIds": [
        "c5-to-google-apis"
      ],
      "winner": "[On-Prem DNS *.googleapis.com -> 199.36.153.8/30] ──▶ [HA VPN / Interconnect] ──▶ [Cloud Router custom route ad for 199.36.153.8/30] ──▶ [GCS / BigQuery]",
      "trap": "Cloud Router does NOT advertise 199.36.153.8/30 by default — you must add a custom route advertisement!"
    },
    {
      "id": "pair-internet-run",
      "label": "🌍 Internet User ──▶ Cloud Run (WAF + CDN)",
      "src": "External Browser / Mobile Client",
      "dst": "Cloud Run Microservice",
      "branchIds": [
        "c1-to-serverless"
      ],
      "winner": "[Client] ──▶ [Global External ALB + Cloud Armor + Cloud CDN] ──▶ [Serverless NEG] ──▶ [Cloud Run (ingress: internal-and-cloud-load-balancing)]",
      "trap": "Leaving Cloud Run ingress = \"all\" lets attackers hit the default *.run.app URL directly and bypass Cloud Armor!"
    },
    {
      "id": "pair-apigee-e2e",
      "label": "🤖 Internet ──▶ Apigee X ──▶ Private GKE / On-Prem",
      "src": "External Partner -> Apigee X",
      "dst": "Private GKE / MIG / On-Prem Backend",
      "branchIds": [
        "c6-apigee-southbound"
      ],
      "winner": "[Client] ──▶ [Global ALB -> PSC NEG] ──▶ [Apigee X] ──▶ [Southbound PSC Endpoint -> Service Attachment] ──▶ [Internal LB -> GKE / Hybrid NEG]",
      "trap": "Modern Apigee X uses Northbound PSC NEG + Southbound PSC Service Attachment to avoid VPC Peering transitive limits!"
    }
  ]
};
