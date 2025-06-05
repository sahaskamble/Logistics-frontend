// mockData.js
export const getMockCFSDetails = (id) => {
  return {
    id: id,
    name: "Balmar Inymix CFS",
    location: "Mumbai Port",
    address: "D1 Container Terminal Road Near Port Area, Mumbai 400001, India",
    description: "Our CFS facility offers fully secured depot with comprehensive port and hinterland place where full container cargo loads and full truck loads are transported and handled by professional staff.",
    facilities: [
      "Container Storage",
      "CCTV",
      "Container Office",
      "Forklift"
    ],
    capacity: "500 containers",
    operatingHours: "24x7 365 Days",
    cfsCode: "IML-CFS-001",
    established: "Jan 2019",
    images: [
      "/GatewayCFS.jpg",
      "/GatewayCFS1.jpg",
      "/GatewayCFS2.jpg",
      "/GatewayCFS3.jpg",
      "/GatewayCFS4.jpg",
      "/GatewayCFS5.jpg",
      "/GatewayCFS6.jpg",
      "/GatewayCFS7.jpg",
      "/GatewayCFS8.jpg",
      "/GatewayCFS9.jpg",
      "/GatewayCFS10.jpg",
      "/GatewayCFS11.jpg",
    ],
    attachments: [
      {
        name: "CFS_License.pdf",
        size: 2456789,
        uploadDate: "2024-01-15",
        type: "pdf",
        url: "/documents/cfs_license.pdf"
      },
      {
        name: "Safety_Certificate.pdf",
        size: 1234567,
        uploadDate: "2024-01-10",
        type: "pdf",
        url: "/documents/safety_cert.pdf"
      },
      {
        name: "Facility_Layout.jpg",
        size: 3456789,
        uploadDate: "2024-01-05",
        type: "image",
        url: "/images/facility_layout.jpg"
      }
    ]
  };
};