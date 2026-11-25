window.GCP_NETWORK_DENDRITE = {
  "soma": {
    "title": "Cloud VPC Core",
    "subtitle": "Global Software-Defined Network · Regional Subnets · Andromeda SDN",
    "facts": [
      "VPCs are GLOBAL; Subnets are REGIONAL (span all zones in a region)",
      "Routes & Firewall Rules are VPC-global (Hierarchical Policies at Org/Folder)",
      "Subnets expand dynamically (/20 -> /16) with zero downtime"
    ]
  },
  "trunks": [
    {
      "id": "t1-google-apis",
      "code": "T1",
      "shortTitle": "VPC ↔ Google APIs & Managed DBs",
      "title": "1. VPC ↔ Google APIs & Managed Services",
      "direction": "VPC / Hybrid → Google Multi-Tenant APIs & Producer VPCs",
      "color": "#2563eb",
      "bgTint": "#eff6ff",
      "branches": [
        {
          "id": "b-pga",
          "code": "1A",
          "title": "Private Google Access (PGA)",
          "badge": "Subnet Toggle · Free",
          "summary": "Lets VMs/GKE nodes WITHOUT external IPs reach multi-tenant Google APIs (*.googleapis.com) over Google backbone.",
          "spines": [
            {
              "id": "s-pga-1",
              "kind": "rule",
              "label": "Target: Cloud Storage, BigQuery, Pub/Sub, Artifact Registry, Logging (multi-tenant APIs)"
            },
            {
              "id": "s-pga-2",
              "kind": "ip",
              "label": "Hybrid DNS VIPs: private.googleapis.com (199.36.153.8/30) · restricted.googleapis.com (199.36.153.4/30)"
            },
            {
              "id": "s-pga-3",
              "kind": "trap",
              "label": "⚠️ TRAP: Reaches Google APIs ONLY — private VMs still CANNOT pull Ubuntu/GitHub internet packages (need Cloud NAT)!"
            }
          ]
        },
        {
          "id": "b-psa",
          "code": "1B",
          "title": "Private Services Access (PSA)",
          "badge": "VPC Peering to Producer",
          "summary": "Allocates /16–/24 IP range + peers your VPC with Google-managed tenant VPC (Cloud SQL, AlloyDB, Memorystore, Filestore).",
          "spines": [
            {
              "id": "s-psa-1",
              "kind": "rule",
              "label": "Used by: Cloud SQL, AlloyDB, Memorystore, Filestore, Apigee, Vertex AI Training"
            },
            {
              "id": "s-psa-2",
              "kind": "ip",
              "label": "On-Prem -> PSA DB: Must enable \"Export custom routes\" on Cloud Router BGP session!"
            },
            {
              "id": "s-psa-3",
              "kind": "trap",
              "label": "⚠️ TRAP: Uses VPC Peering under the hood -> NON-TRANSITIVE! Another peered spoke VPC cannot reach PSA DB!"
            }
          ]
        },
        {
          "id": "b-psc",
          "code": "1C",
          "title": "Private Service Connect (PSC)",
          "badge": "⚠️ PCA v6.1 Star · NAT Endpoint",
          "summary": "Consumer-side internal IP (Endpoint) or LB Backend connecting to Service Attachments or Google APIs — zero peering!",
          "spines": [
            {
              "id": "s-psc-1",
              "kind": "rule",
              "label": "PSC Endpoint -> Service Attachment (Producer ILB): Cross-VPC, Cross-Org, 3rd-party SaaS (Snowflake/MongoDB)"
            },
            {
              "id": "s-psc-2",
              "kind": "ip",
              "label": "SOLVES OVERLAPPING CIDRs & TRANSITIVITY: Uses NAT at Service Attachment — no VPC peering quota or CIDR clash!"
            },
            {
              "id": "s-psc-3",
              "kind": "rule",
              "label": "PSC Endpoints for Google APIs: Custom internal VIP (e.g. 10.0.0.50) + custom DNS (storage-corp.p.googleapis.com)"
            },
            {
              "id": "s-psc-4",
              "kind": "trap",
              "label": "⚠️ Architecture Note: PSC Endpoints are UNIDIRECTIONAL (Consumer -> Producer); use PSC Interfaces for Producer-initiated L3!"
            }
          ]
        },
        {
          "id": "b-vpcsc",
          "code": "1D",
          "title": "VPC Service Controls (VPC-SC)",
          "badge": "Anti-Exfiltration Perimeter",
          "summary": "Cryptographic API boundary around projects + BigQuery / GCS / Vertex AI stopping data copy to external projects.",
          "spines": [
            {
              "id": "s-vpcsc-1",
              "kind": "rule",
              "label": "Blocks stolen SA keys / malicious insiders from running gsutil cp or BQ query-export out of perimeter"
            },
            {
              "id": "s-vpcsc-2",
              "kind": "ip",
              "label": "Pair with restricted.googleapis.com (199.36.153.4/30) + Access Context Manager IP/Device policies"
            },
            {
              "id": "s-vpcsc-3",
              "kind": "trap",
              "label": "⚠️ TRAP: VPC Firewalls CANNOT block multi-tenant Google API exfiltration — ONLY VPC-SC does! Test in Dry-Run mode first."
            }
          ]
        }
      ]
    },
    {
      "id": "t2-serverless-vpc",
      "code": "T2",
      "shortTitle": "Serverless ↔ VPC",
      "title": "2. Serverless Compute ↔ VPC Bridges",
      "direction": "Cloud Run / Functions / App Engine ↔ Private RFC 1918 VPC",
      "color": "#7c3aed",
      "bgTint": "#f5f3ff",
      "branches": [
        {
          "id": "b-direct-egress",
          "code": "2A",
          "title": "Direct VPC Egress (Serverless → VPC)",
          "badge": "⚡ Modern Default",
          "summary": "Cloud Run (Services, Jobs & Gen 2 Functions) sends packets directly into a VPC subnet with ZERO proxy VMs.",
          "spines": [
            {
              "id": "s-dve-1",
              "kind": "rule",
              "label": "Best for: Cloud Run -> AlloyDB / Cloud SQL / Memorystore / Internal VMs OR static outbound IP via Cloud NAT!"
            },
            {
              "id": "s-dve-2",
              "kind": "ip",
              "label": "Subnet sizing: Allocates internal IPs directly to Cloud Run instances — provision /26 or larger for burst scale!"
            },
            {
              "id": "s-dve-3",
              "kind": "trap",
              "label": "⚠️ TRAP: Faster & cheaper than VPC Connector (no idle e2-micro VMs), but NOT supported on App Engine Standard!"
            }
          ]
        },
        {
          "id": "b-svpca",
          "code": "2B",
          "title": "Serverless VPC Access Connector",
          "badge": "Legacy / App Engine Std (/28)",
          "summary": "Managed e2-micro/f1-micro bridge VMs in a dedicated /28 subnet forwarding serverless egress into VPC.",
          "spines": [
            {
              "id": "s-svpca-1",
              "kind": "rule",
              "label": "Choose when: App Engine Standard or Gen 1 Cloud Functions must reach Memorystore / Cloud SQL private IP"
            },
            {
              "id": "s-svpca-2",
              "kind": "trap",
              "label": "⚠️ TRAP: Requires a dedicated UNUSED /28 subnet and bills 24/7 for connector VMs even when traffic is zero!"
            }
          ]
        },
        {
          "id": "b-sneg",
          "code": "2C",
          "title": "Serverless NEG + Ingress Control (VPC/Ext → Serverless)",
          "badge": "Inbound to Serverless",
          "summary": "Routes External or Internal Application Load Balancer traffic into Cloud Run, App Engine, or Functions.",
          "spines": [
            {
              "id": "s-sneg-1",
              "kind": "rule",
              "label": "External ALB + Cloud Armor + Cloud CDN -> Serverless NEG -> Cloud Run (multi-region active-active!)"
            },
            {
              "id": "s-sneg-2",
              "kind": "rule",
              "label": "Internal ALB -> Serverless NEG -> Cloud Run (private RFC 1918 URL reachable from VPC & On-Prem VPN/Interconnect)"
            },
            {
              "id": "s-sneg-3",
              "kind": "trap",
              "label": "⚠️ TRAP: MUST set Cloud Run Ingress = \"Internal and Cloud Load Balancing\" or attackers bypass Cloud Armor via *.run.app!"
            }
          ]
        }
      ]
    },
    {
      "id": "t3-vpc-to-vpc",
      "code": "T3",
      "shortTitle": "VPC ↔ VPC (Multi-Project)",
      "title": "3. VPC ↔ VPC & Multi-Project Isolation",
      "direction": "East-West Across Teams, Projects & Organizations",
      "color": "#059669",
      "bgTint": "#ecfdf5",
      "branches": [
        {
          "id": "b-shared-vpc",
          "code": "3A",
          "title": "Shared VPC (Host + Service Projects)",
          "badge": "#1 Enterprise Best Practice",
          "summary": "Central Host Project owns subnets, firewalls & VPN/Interconnect; Service Projects attach workloads via IAM.",
          "spines": [
            {
              "id": "s-svpc-1",
              "kind": "rule",
              "label": "Least Privilege: NetOps manages Host Project; Developers get compute.networkUser on specific subnets only"
            },
            {
              "id": "s-svpc-2",
              "kind": "ip",
              "label": "TRANSITIVE TO HYBRID: Every Service Project automatically shares Host HA VPN / Dedicated Interconnect!"
            },
            {
              "id": "s-svpc-3",
              "kind": "trap",
              "label": "⚠️ TRAP: Must belong to the SAME GCP Organization (for Cross-Org use VPC Peering or PSC)!"
            }
          ]
        },
        {
          "id": "b-vpc-peering",
          "code": "3B",
          "title": "VPC Network Peering",
          "badge": "Cross-Org · Non-Transitive",
          "summary": "Direct decentralized subnet route exchange between two VPCs (same or different Orgs) at full backbone speed.",
          "spines": [
            {
              "id": "s-peer-1",
              "kind": "rule",
              "label": "Works across DIFFERENT GCP Organizations; both VPC admins must independently create peering configuration"
            },
            {
              "id": "s-peer-2",
              "kind": "trap",
              "label": "⚠️ TRAP 1: NON-TRANSITIVE! If VPC-A <-> VPC-B and VPC-B <-> VPC-C (or VPN), VPC-A CANNOT reach VPC-C or VPN!"
            },
            {
              "id": "s-peer-3",
              "kind": "trap",
              "label": "⚠️ TRAP 2: ZERO CIDR overlap allowed across any subnet in peered VPCs (if overlapping -> use PSC or Private NAT)!"
            }
          ]
        },
        {
          "id": "b-ncc",
          "code": "3C",
          "title": "Network Connectivity Center (NCC)",
          "badge": "Central Hub & Spoke",
          "summary": "Unified Hub connecting hundreds of VPC Spokes (mesh or star) + Hybrid Spokes (VPN, Interconnect, SD-WAN).",
          "spines": [
            {
              "id": "s-ncc-1",
              "kind": "rule",
              "label": "Eliminates N*(N-1)/2 full-mesh VPC peering sprawl across 50–250+ enterprise spoke VPCs"
            },
            {
              "id": "s-ncc-2",
              "kind": "ip",
              "label": "Bridges Site-to-Site & Hybrid-to-VPC transit; Pair with Private NAT when spoke CIDRs overlap"
            }
          ]
        },
        {
          "id": "b-multinic-dns",
          "code": "3D",
          "title": "Multi-NIC NVA Firewalls & Cross-VPC Cloud DNS",
          "badge": "L7 Inspection & Name Resolution",
          "summary": "Multi-NIC security appliances behind Internal Passthrough NLB + Cloud DNS Peering / Forwarding.",
          "spines": [
            {
              "id": "s-mnic-1",
              "kind": "rule",
              "label": "Multi-NIC VM (up to 8 NICs, each in a DIFFERENT VPC) + Internal Passthrough NLB as custom route next-hop"
            },
            {
              "id": "s-mnic-2",
              "kind": "ip",
              "label": "Cloud DNS: Private Zone attachment (up to 5 VPCs), DNS Peering (cross-VPC), Inbound Policy (35.199.192.0/19 from On-Prem)"
            }
          ]
        }
      ]
    },
    {
      "id": "t4-external-to-internal",
      "code": "T4",
      "shortTitle": "External → Internal (Ingress)",
      "title": "4. External Internet → Internal VPC (Inbound)",
      "direction": "Public Users / IoT / Workforce → Private Backends",
      "color": "#ea580c",
      "bgTint": "#fff7ed",
      "branches": [
        {
          "id": "b-global-alb",
          "code": "4A",
          "title": "Global External Application LB (L7 HTTP/S)",
          "badge": "Anycast VIP · CDN + Armor",
          "summary": "Global edge proxy routing HTTP/HTTPS/gRPC/WebSocket to closest healthy region with URL maps, CDN & WAF.",
          "spines": [
            {
              "id": "s-galb-1",
              "kind": "rule",
              "label": "Backends: GCE MIGs, GKE Container-Native Zonal NEGs (Pod IP direct!), Serverless NEGs, GCS Buckets, Internet/Hybrid NEGs"
            },
            {
              "id": "s-galb-2",
              "kind": "ip",
              "label": "Edge Shield: Cloud Armor (OWASP SQLi/XSS WAF, Adaptive DDoS, Geo/IP Rate Limit) + Cloud CDN edge cache"
            },
            {
              "id": "s-galb-3",
              "kind": "trap",
              "label": "⚠️ TRAP: Requires Premium Network Tier for global Anycast! If TLS must NEVER terminate outside 1 region -> Regional External ALB!"
            }
          ]
        },
        {
          "id": "b-nlb-family",
          "code": "4B",
          "title": "External Proxy NLB vs. Passthrough NLB (L4)",
          "badge": "Non-HTTP TCP / SSL / UDP",
          "summary": "Proxy NLB terminates TCP/SSL globally at Google edge; Passthrough NLB forwards raw L4 TCP/UDP regionally.",
          "spines": [
            {
              "id": "s-nlb-1",
              "kind": "rule",
              "label": "SSL / TCP Proxy NLB: Global Anycast IP + Managed Certs for non-HTTP TCP (IoT MQTT 8883, IMAPS)"
            },
            {
              "id": "s-nlb-2",
              "kind": "rule",
              "label": "Passthrough NLB: Regional Maglev for UDP (gaming/VoIP), all ports, end-to-end VM TLS, & preserving Client Source IP!"
            },
            {
              "id": "s-nlb-3",
              "kind": "trap",
              "label": "⚠️ Architecture Note: SSL Proxy NLB is for NON-HTTP TLS only — for HTTPS web apps always pick Application Load Balancer!"
            }
          ]
        },
        {
          "id": "b-iap",
          "code": "4C",
          "title": "Identity-Aware Proxy (IAP) — Zero-Trust Access",
          "badge": "No Public VM IP · No VPN",
          "summary": "Authenticates Google Identity + Device Posture at edge before proxying HTTPS apps or SSH/RDP TCP tunnels.",
          "spines": [
            {
              "id": "s-iap-1",
              "kind": "rule",
              "label": "IAP HTTPS: Workforce / Contractor zero-trust browser login to internal App Engine, Cloud Run, GKE, GCE apps"
            },
            {
              "id": "s-iap-2",
              "kind": "ip",
              "label": "IAP TCP (SSH/RDP): Allow firewall TCP:22/3389 ONLY from 35.235.240.0/20 -> zero bastion hosts, zero public VM IPs!"
            },
            {
              "id": "s-iap-3",
              "kind": "trap",
              "label": "⚠️ TRAP: Never put IAP in front of anonymous public e-commerce consumers (blocks unauthenticated shoppers)!"
            }
          ]
        }
      ]
    },
    {
      "id": "t5-internal-to-external",
      "code": "T5",
      "shortTitle": "Internal → External (Egress)",
      "title": "5. Internal VPC → External Internet (Outbound)",
      "direction": "Private VMs / GKE / Serverless → Public Internet & Partner APIs",
      "color": "#0891b2",
      "bgTint": "#ecfeff",
      "branches": [
        {
          "id": "b-cloud-nat",
          "code": "5A",
          "title": "Cloud NAT (Public SNAT on Cloud Router)",
          "badge": "Outbound-Initiated Only",
          "summary": "Regional, proxy-less software-defined SNAT giving private VMs, private GKE, & Cloud Run outbound internet access.",
          "spines": [
            {
              "id": "s-nat-1",
              "kind": "rule",
              "label": "Use cases: OS apt/yum patching, pulling external Docker/pip packages, calling partner webhooks from static NAT IPs"
            },
            {
              "id": "s-nat-2",
              "kind": "ip",
              "label": "High Performance: No choke-point NAT VM in data path (programmed directly in Andromeda host vSwitch!)"
            },
            {
              "id": "s-nat-3",
              "kind": "trap",
              "label": "⚠️ TRAP: Outbound-initiated ONLY! Unsolicited inbound internet packets are ALWAYS dropped (use LB/IAP for inbound)!"
            }
          ]
        },
        {
          "id": "b-swp-privnat",
          "code": "5B",
          "title": "Secure Web Proxy (L7 FQDN Egress) & Private NAT",
          "badge": "Domain Allowlist & CIDR NAT",
          "summary": "Secure Web Proxy filters outbound HTTPS by domain/URL; Private NAT translates overlapping internal CIDRs.",
          "spines": [
            {
              "id": "s-swp-1",
              "kind": "rule",
              "label": "Secure Web Proxy: Enforce outbound allowlists by FQDN/URL path (e.g. allow only *.github.com & api.stripe.com)"
            },
            {
              "id": "s-swp-2",
              "kind": "ip",
              "label": "Private NAT: Translates overlapping RFC 1918 source IPs across NCC Hybrid / Multi-VPC spokes"
            }
          ]
        }
      ]
    },
    {
      "id": "t6-hybrid-multicloud",
      "code": "T6",
      "shortTitle": "On-Prem & Clouds ↔ VPC",
      "title": "6. On-Premises, GCVE & Multi-Cloud ↔ VPC",
      "direction": "Data Centers, Branch Offices, VMware & AWS/Azure/OCI ↔ GCP VPC",
      "color": "#ca8a04",
      "bgTint": "#fefce8",
      "branches": [
        {
          "id": "b-ha-vpn",
          "code": "6A",
          "title": "HA VPN + Cloud Router (BGP)",
          "badge": "IPsec · 99.99% SLA · Fast Setup",
          "summary": "Encrypted IPsec tunnels over public internet (or over Interconnect!) with dynamic BGP failover in minutes.",
          "spines": [
            {
              "id": "s-vpn-1",
              "kind": "rule",
              "label": "2-Interface Gateway -> 2 (or 4) tunnels to redundant on-prem routers = 99.99% SLA (~1.5–3 Gbps/tunnel, ECMP scalable)"
            },
            {
              "id": "s-vpn-2",
              "kind": "trap",
              "label": "⚠️ Architecture Note: Classic VPN is deprecated! Always pick HA VPN + Cloud Router dynamic BGP."
            }
          ]
        },
        {
          "id": "b-interconnect",
          "code": "6B",
          "title": "Dedicated vs. Partner vs. Cross-Cloud Interconnect",
          "badge": "50 Mbps – 200 Gbps Private Fiber",
          "summary": "Physical private L2/L3 circuits bypassing public internet for low jitter, high throughput & lower egress cost.",
          "spines": [
            {
              "id": "s-ic-1",
              "kind": "rule",
              "label": "Dedicated Interconnect: 10G/100G inside Google Colocation POP (4 links across 2 metro EADs = 99.99% SLA)"
            },
            {
              "id": "s-ic-2",
              "kind": "rule",
              "label": "Partner Interconnect: 50 Mbps–50 Gbps via Telco Carrier when data center is far from Google POP"
            },
            {
              "id": "s-ic-3",
              "kind": "rule",
              "label": "Cross-Cloud Interconnect: 10G/100G direct fiber between GCP and AWS / Azure / OCI"
            },
            {
              "id": "s-ic-4",
              "kind": "trap",
              "label": "⚠️ TRAP: Interconnect is UNENCRYPTED by default & takes weeks to provision -> add HA VPN over Interconnect or MACsec if mandated!"
            }
          ]
        },
        {
          "id": "b-gcve",
          "code": "6C",
          "title": "Google Cloud VMware Engine (GCVE) + HCX",
          "badge": "L2 Stretched Phased Migration",
          "summary": "Bare-metal vSphere/vSAN/NSX-T private cloud peered to your VPC + VMware HCX L2 stretch to on-prem.",
          "spines": [
            {
              "id": "s-gcve-1",
              "kind": "rule",
              "label": "Connects On-Prem <-> GCVE via Cloud VPN / Interconnect + HCX L2 extension (live vMotion WITHOUT changing VM IPs!)"
            },
            {
              "id": "s-gcve-2",
              "kind": "ip",
              "label": "Connects GCVE <-> Native GCP VPC via Private Services Access / VPC Network Peering"
            }
          ]
        },
        {
          "id": "b-direct-peering",
          "code": "6D",
          "title": "Direct / Carrier Peering (PUBLIC ONLY)",
          "badge": "⚠️ #1 Exam Distractor",
          "summary": "Edge BGP peering strictly for public Google Workspace & YouTube IPs — OUTSIDE Cloud VPC!",
          "spines": [
            {
              "id": "s-dp-1",
              "kind": "trap",
              "label": "⚠️ ALWAYS ELIMINATE FOR VPC: Cannot reach private RFC 1918 VPC IPs, not recommended for GCP, and has NO SLA!"
            }
          ]
        }
      ]
    }
  ],
  "scenarios": [
    {
      "id": "sc-vm-gcs",
      "label": "Private VM (No Ext IP) → Cloud Storage / BigQuery",
      "src": "Private GCE VM / GKE Pod",
      "dst": "Cloud Storage / BigQuery API",
      "trunkId": "t1-google-apis",
      "branchIds": [
        "b-pga",
        "b-vpcsc"
      ],
      "winner": "Enable Private Google Access (PGA) on the subnet (+ VPC Service Controls if anti-exfiltration is required).",
      "trap": "Do NOT add External IPs or pay for Cloud NAT just to reach Google APIs!"
    },
    {
      "id": "sc-run-alloydb",
      "label": "Cloud Run → AlloyDB / Cloud SQL + Static Outbound IP",
      "src": "Cloud Run Service (Gen 2)",
      "dst": "AlloyDB Private IP / Partner Webhook",
      "trunkId": "t2-serverless-vpc",
      "branchIds": [
        "b-direct-egress",
        "b-psa",
        "b-cloud-nat"
      ],
      "winner": "Configure Direct VPC Egress on Cloud Run into your VPC subnet (reaches PSA AlloyDB directly & exits via Cloud NAT static IP!).",
      "trap": "Avoid legacy Serverless VPC Access Connector VMs on Cloud Run unless App Engine Standard is involved."
    },
    {
      "id": "sc-overlap-vpc",
      "label": "Spoke VPCs (Overlapping CIDRs) → Internal Producer API",
      "src": "20 Consumer VPCs (Overlapping 10.0.0.0/16)",
      "dst": "Producer Microservice behind Internal LB",
      "trunkId": "t1-google-apis",
      "branchIds": [
        "b-psc"
      ],
      "winner": "Publish Producer ILB via a Private Service Connect (PSC) Service Attachment; consumers connect via local PSC Endpoints.",
      "trap": "VPC Network Peering FAILS on overlapping CIDRs and is non-transitive!"
    },
    {
      "id": "sc-public-run-waf",
      "label": "Public Internet Users → Cloud Run + WAF + CDN",
      "src": "Global Browser / Mobile Clients",
      "dst": "Cloud Run Microservice + Static Assets",
      "trunkId": "t4-external-to-internal",
      "branchIds": [
        "b-global-alb",
        "b-sneg"
      ],
      "winner": "Global External Application LB + Cloud Armor + Cloud CDN -> Serverless NEG -> Cloud Run (Ingress = Internal & Cloud LB).",
      "trap": "Leaving Cloud Run Ingress = \"All\" lets attackers hit *.run.app directly and bypass Cloud Armor!"
    },
    {
      "id": "sc-ssh-private-vm",
      "label": "Remote Engineer → SSH/RDP into Private VM (Zero VPN)",
      "src": "Employee Laptop (Home Wi-Fi)",
      "dst": "Private Compute Engine VM (No Public IP)",
      "trunkId": "t4-external-to-internal",
      "branchIds": [
        "b-iap"
      ],
      "winner": "Cloud IAP TCP Forwarding (`--tunnel-through-iap`) + Firewall allowing TCP 22/3389 from `35.235.240.0/20`.",
      "trap": "No bastion jump-host VM and no public IP needed!"
    },
    {
      "id": "sc-multi-team-org",
      "label": "15 Dev Teams + 1 Shared Interconnect (Same Org)",
      "src": "15 Microservice Projects",
      "dst": "Central Subnets + Dedicated Interconnect",
      "trunkId": "t3-vpc-to-vpc",
      "branchIds": [
        "b-shared-vpc",
        "b-interconnect"
      ],
      "winner": "Shared VPC: 1 Host Project (NetOps owns firewalls & Interconnect VLANs) + 15 Service Projects (`compute.networkUser`).",
      "trap": "VPC Peering across 15 projects is non-transitive to Interconnect without duplicating VLANs or NCC!"
    },
    {
      "id": "sc-onprem-40g-encrypted",
      "label": "On-Prem Data Center ↔ VPC (40 Gbps + Encrypted + 99.99% SLA)",
      "src": "On-Premises Colocated Router",
      "dst": "GCP Shared VPC (Encrypted Mandate)",
      "trunkId": "t6-hybrid-multicloud",
      "branchIds": [
        "b-interconnect",
        "b-ha-vpn"
      ],
      "winner": "Redundant Dedicated Interconnects across 2 Metro EADs + HA VPN tunnels deployed OVER Interconnect (or MACsec).",
      "trap": "Dedicated Interconnect alone is UNENCRYPTED; Direct Peering CANNOT reach VPC RFC 1918 IPs!"
    },
    {
      "id": "sc-priv-vm-internet",
      "label": "Private GKE Pods → External Ubuntu / Stripe API (Allowlisted IP)",
      "src": "Private GKE Autopilot Pods",
      "dst": "External Partner HTTPS API",
      "trunkId": "t5-internal-to-external",
      "branchIds": [
        "b-cloud-nat",
        "b-swp-privnat"
      ],
      "winner": "Cloud NAT with manual static external IPv4 addresses (or Secure Web Proxy if filtering by FQDN domain name).",
      "trap": "Private Google Access only reaches Google APIs, not external internet domains!"
    }
  ]
};
