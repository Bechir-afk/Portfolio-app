/**
 * Certificate metadata.
 * Source files: doc/certifs/ -> copied to public/certs/ before Phase 7.
 * Title and issuer text lives in locale files.
 * Populated / finalized in Phase 7 by GLM 5.2.
 */

export interface Certificate {
  id: string;
  titleKey: string;  // locale key: certificates.[id].title
  issuerKey: string; // locale key: certificates.[id].issuer
  issueDate: string; // ISO date string: YYYY-MM-DD or YYYY
  asset: string;     // path: /certs/[id].[ext]
  format: 'image' | 'pdf';
  credentialUrl?: string;
}

// TODO (Phase 7 — GLM 5.2): update asset paths and formats once
// doc/certifs/ is populated and files are moved to public/certs/
export const certificates: Certificate[] = [
  {
    id: 'nvidia-deep-learning',
    titleKey: 'certificates.nvidia-deep-learning.title',
    issuerKey: 'certificates.nvidia-deep-learning.issuer',
    issueDate: '2025',
    asset: '/certs/nvidia-deep-learning.png',
    format: 'image',
  },
  {
    id: 'nmap-vulnerability',
    titleKey: 'certificates.nmap-vulnerability.title',
    issuerKey: 'certificates.nmap-vulnerability.issuer',
    issueDate: '2025',
    asset: '/certs/nmap-vulnerability.png',
    format: 'image',
  },
  {
    id: 'cpp-encryption',
    titleKey: 'certificates.cpp-encryption.title',
    issuerKey: 'certificates.cpp-encryption.issuer',
    issueDate: '2025',
    asset: '/certs/cpp-encryption.png',
    format: 'image',
  },
  {
    id: 'cisco-networking-basics',
    titleKey: 'certificates.cisco-networking-basics.title',
    issuerKey: 'certificates.cisco-networking-basics.issuer',
    issueDate: '2025',
    asset: '/certs/cisco-networking-basics.png',
    format: 'image',
  },
  {
    id: 'cisco-cybersecurity-intro',
    titleKey: 'certificates.cisco-cybersecurity-intro.title',
    issuerKey: 'certificates.cisco-cybersecurity-intro.issuer',
    issueDate: '2025',
    asset: '/certs/cisco-cybersecurity-intro.png',
    format: 'image',
  },
  {
    id: 'cisco-iot-intro',
    titleKey: 'certificates.cisco-iot-intro.title',
    issuerKey: 'certificates.cisco-iot-intro.issuer',
    issueDate: '2025',
    asset: '/certs/cisco-iot-intro.png',
    format: 'image',
  },
  {
    id: 'aws-route53',
    titleKey: 'certificates.aws-route53.title',
    issuerKey: 'certificates.aws-route53.issuer',
    issueDate: '2025',
    asset: '/certs/aws-route53.png',
    format: 'image',
  },
  {
    id: 'aws-vpc',
    titleKey: 'certificates.aws-vpc.title',
    issuerKey: 'certificates.aws-vpc.issuer',
    issueDate: '2025',
    asset: '/certs/aws-vpc.png',
    format: 'image',
  },
  {
    id: 'linux-terminal',
    titleKey: 'certificates.linux-terminal.title',
    issuerKey: 'certificates.linux-terminal.issuer',
    issueDate: '2025',
    asset: '/certs/linux-terminal.png',
    format: 'image',
  },
  {
    id: 'python-devops',
    titleKey: 'certificates.python-devops.title',
    issuerKey: 'certificates.python-devops.issuer',
    issueDate: '2025',
    asset: '/certs/python-devops.png',
    format: 'image',
  },
  {
    id: 'google-css',
    titleKey: 'certificates.google-css.title',
    issuerKey: 'certificates.google-css.issuer',
    issueDate: '2025',
    asset: '/certs/google-css.png',
    format: 'image',
  },
];
