import { ArrowDown, Bell, Boxes, Container, CreditCard, FastForward, FileSearch2, FileText, House, LayoutDashboard, LayoutGrid, MailQuestion, MapPinned, Package, Receipt, ReceiptIndianRupee, Scale, Scan, Ship, Truck, TruckElectric, UploadIcon, User, Warehouse } from "lucide-react";

export const navLinks = [
	{ label: "Home", href: "/customer/home", icon: House, access: 'Customer', },
	{ label: "Dashboard", href: "/customer/dashboard", icon: LayoutDashboard, access: 'Customer', },
	{
		label: "CFS",
		href: '',
		icon: Ship,
		access: 'Customer',
		subItems: [
			{ label: "Orders", href: "/customer/cfs/orders", access: 'Customer', icon: Package },
			{ label: "Pricing Requests", href: "/customer/cfs/pricing-requests", icon: ReceiptIndianRupee, access: 'Customer', },
			{ label: "Service Requests", href: "/customer/cfs/requests", icon: MailQuestion, access: 'Customer', },
			{ label: "Services", href: "/customer/cfs/services", access: 'Customer', icon: FileSearch2 },
			{ label: "Track & Trace", href: "/customer/cfs/track-trace", access: 'Customer', icon: MapPinned },
			{ label: "Tariff Upload", href: "/customer/cfs/tariff-upload", access: 'Customer', icon: UploadIcon },
			{ label: "EIR / COP", href: '/customer/cfs/services/eir-cop', access: 'Customer', icon: FileText, },
			{ label: "Priority Movements", href: '/customer/cfs/services/priority', access: 'Customer', icon: FastForward, },
			{ label: "Weighment Slip", href: '/customer/cfs/services/weighment-slip', access: 'Customer', icon: Scale, },
			{ label: "Special Equipment", href: '/customer/cfs/services/special-equipment', access: 'Customer', icon: LayoutGrid, },
			{ label: "Container Grounding", href: '/customer/cfs/services/container-grounding', access: 'Customer', icon: ArrowDown, },
			{ label: "Container Staging", href: '/customer/cfs/services/container-staging', access: 'Customer', icon: Boxes, },
			{ label: "Re-Scanning", href: '/customer/cfs/services/rescan', access: 'Customer', icon: Scan, },
			{ label: "Cheque Acceptance", href: '/customer/cfs/services/cheque', access: 'Customer', icon: CreditCard, },
			{ label: "Tax Invoice", href: '/customer/cfs/services/tax-invoice', access: 'Customer', icon: Receipt, },
			{ label: "Job Order Update", href: '/customer/cfs/services/job-order', access: 'Customer', icon: FileText, },
		]
	},
	{
		label: "Warehouse",
		href: '',
		icon: Warehouse,
		access: 'Customer',
		subItems: [
			{ label: "Orders", href: "/customer/warehouse/orders", access: 'Customer', icon: Package },
			{ label: "Pricing Requests", href: "/customer/warehouse/pricing-requests", icon: ReceiptIndianRupee, access: 'Customer', },
			{ label: "Service Requests", href: "/customer/warehouse/requests", icon: MailQuestion, access: 'Customer', },
			{ label: "Services", href: "/customer/warehouse/services", access: 'Customer', icon: FileSearch2 },
			{ label: "Track & Trace", href: "/customer/warehouse/track-trace", access: 'Customer', icon: MapPinned },
			{ label: "Tariff Upload", href: "/customer/warehouse/tariff-upload", access: 'Customer', icon: UploadIcon },
			{ label: "EIR / COP", href: '/customer/warehouse/services/eir-cop', access: 'Customer', icon: FileText, },
			{ label: "Priority Movements", href: '/customer/warehouse/services/priority', access: 'Customer', icon: FastForward, },
			{ label: "Weighment Slip", href: '/customer/warehouse/services/weighment-slip', access: 'Customer', icon: Scale, },
			{ label: "Special Equipment", href: '/customer/warehouse/services/special-equipment', access: 'Customer', icon: LayoutGrid, },
			{ label: "Container Grounding", href: '/customer/warehouse/services/container-grounding', access: 'Customer', icon: ArrowDown, },
			{ label: "Container Staging", href: '/customer/warehouse/services/container-staging', access: 'Customer', icon: Boxes, },
			{ label: "Re-Scanning", href: '/customer/warehouse/services/rescan', access: 'Customer', icon: Scan, },
			{ label: "Cheque Acceptance", href: '/customer/warehouse/services/cheque', access: 'Customer', icon: CreditCard, },
			{ label: "Tax Invoice", href: '/customer/warehouse/services/tax-invoice', access: 'Customer', icon: Receipt, },
			{ label: "Job Order Update", href: '/customer/warehouse/services/job-order', access: 'Customer', icon: FileText, },
		]
	},
	{
		label: 'Transport',
		href: '',
		icon: Truck,
		access: 'Customer',
		subItems: [
			{ label: "Orders", href: "/customer/transport/orders", icon: Package, access: 'Customer', },
			{ label: "Pricing Requests", href: "/customer/transport/pricing-requests", icon: ReceiptIndianRupee, access: 'Customer', },
		],
	},
	{ label: "Containers Management", href: "/customer/container-management", access: 'Customer', icon: Container },
	{ label: "Notifications & Updates", href: "", access: 'Customer', icon: Bell },
	{ label: "Profile & Support", href: "/customer/profile", access: 'Customer', icon: User },


	// Merchant
	{
		label: "Dashboard",
		href: "/client/dashboard",
		icon: LayoutDashboard,
		access: 'Client',
	},
	{
		label: "CFS",
		href: '',
		icon: Ship,
		access: 'Client',
		subItems: [
			{ label: "Orders", href: "/client/cfs/orders", access: 'Client', icon: Package },
			{ label: "Order Movement", href: "/client/cfs/order-movement", access: 'Client', icon: MapPinned },
			{ label: "Service Requests", href: "/client/cfs/requests", icon: MailQuestion, access: 'Client', },
			{ label: "Services", href: "/client/cfs/services", access: 'Client', icon: FileSearch2 },
			{ label: "Tariff Upload", href: "/client/cfs/tariff-upload", access: 'Client', icon: UploadIcon },
			{ label: "EIR / COP", href: '/client/cfs/services/eir-cop', access: 'Client', icon: FileText, },
			{ label: "Priority Movements", href: '/client/cfs/services/priority', access: 'Client', icon: FastForward, },
			{ label: "Weighment Slip", href: '/client/cfs/services/weighment-slip', access: 'Client', icon: Scale, },
			{ label: "Special Equipment", href: '/client/cfs/services/special-equipment', access: 'Client', icon: LayoutGrid, },
			{ label: "Container Grounding", href: '/client/cfs/services/container-grounding', access: 'Client', icon: ArrowDown, },
			{ label: "Container Staging", href: '/client/cfs/services/container-staging', access: 'Client', icon: Boxes, },
			{ label: "Re-Scanning", href: '/client/cfs/services/rescan', access: 'Client', icon: Scan, },
			{ label: "Cheque Acceptance", href: '/client/cfs/services/cheque', access: 'Client', icon: CreditCard, },
			{ label: "Tax Invoice", href: '/client/cfs/services/tax-invoice', access: 'Client', icon: Receipt, },
			{ label: "Job Orders", href: '/client/cfs/services/job-order', access: 'Client', icon: FileText, },
		]
	},
	{
		label: "Warehouse",
		href: '',
		icon: Warehouse,
		access: 'Client',
		subItems: [
			{ label: "Orders", href: "/client/warehouse/orders", access: 'Client', icon: Package },
			{ label: "Order Movement", href: "/client/warehouse/order-movement", access: 'Client', icon: MapPinned },
			{ label: "Service Requests", href: "/client/warehouse/requests", icon: MailQuestion, access: 'Client', },
			{ label: "Services", href: "/client/warehouse/services", access: 'Client', icon: FileSearch2 },
			{ label: "Tariff Upload", href: "/client/warehouse/tariff-upload", access: 'Client', icon: UploadIcon },
			{ label: "EIR / COP", href: '/client/warehouse/services/eir-cop', access: 'Client', icon: FileText, },
			{ label: "Priority Movements", href: '/client/warehouse/services/priority', access: 'Client', icon: FastForward, },
			{ label: "Weighment Slip", href: '/client/warehouse/services/weighment-slip', access: 'Client', icon: Scale, },
			{ label: "Special Equipment", href: '/client/warehouse/services/special-equipment', access: 'Client', icon: LayoutGrid, },
			{ label: "Container Grounding", href: '/client/warehouse/services/container-grounding', access: 'Client', icon: ArrowDown, },
			{ label: "Container Staging", href: '/client/warehouse/services/container-staging', access: 'Client', icon: Boxes, },
			{ label: "Re-Scanning", href: '/client/warehouse/services/rescan', access: 'Client', icon: Scan, },
			{ label: "Cheque Acceptance", href: '/client/warehouse/services/cheque', access: 'Client', icon: CreditCard, },
			{ label: "Tax Invoice", href: '/client/warehouse/services/tax-invoice', access: 'Client', icon: Receipt, },
			{ label: "Job Orders", href: '/client/warehouse/services/job-order', access: 'Client', icon: FileText, },
		]
	},
	{
		label: 'Transport',
		href: '',
		icon: Truck,
		access: 'Client',
		subItems: [
			{ label: "Orders", href: "/client/transport/orders", icon: Package, access: 'Client', },
		],
	},
	{ label: "Vehicles Management", href: "/client/vehicle-management", access: 'Client', icon: TruckElectric },
	{ label: "Notifications & Updates", href: "", access: 'Client', icon: Bell },
	{ label: "Profile & Support", href: "/client/profile", access: 'Client', icon: User },


	// GOL
	{
		label: "Dashboard",
		href: "/gol/dashboard",
		icon: LayoutDashboard,
		access: 'GOL',
	},
	{
		label: "CFS",
		href: '',
		icon: Ship,
		access: 'GOL',
		subItems: [
			{ label: "Orders", href: "/gol/cfs/orders", icon: Package, access: 'GOL' },
			{ label: "Service Requests", href: "/gol/cfs/requests", icon: MailQuestion, access: 'GOL', },
			{ label: "Pricing Requests", href: "/gol/cfs/pricing-requests", icon: ReceiptIndianRupee, access: 'GOL', },
			{ label: "Tariff Upload", href: "/gol/cfs/tariff-upload", access: 'GOL', icon: UploadIcon },
		]
	},
	{
		label: "Warehouse",
		href: '',
		icon: Warehouse,
		access: 'GOL',
		subItems: [
			{ label: "Orders", href: "/gol/warehouse/orders", icon: Package, access: 'GOL' },
			{ label: "Service Requests", href: "/gol/warehouse/requests", icon: MailQuestion, access: 'GOL', },
			{ label: "Pricing Requests", href: "/gol/warehouse/pricing-requests", icon: ReceiptIndianRupee, access: 'GOL', },
			{ label: "Tariff Upload", href: "/gol/warehouse/tariff-upload", access: 'GOL', icon: UploadIcon },
		]
	},
	{
		label: 'Transport',
		href: '',
		icon: Truck,
		access: 'GOL',
		subItems: [
			{ label: "Orders", href: "/gol/transport/orders", icon: Package, access: 'GOL', },
			{ label: "Pricing Requests", href: "/gol/transport/pricing-requests", icon: ReceiptIndianRupee, access: 'GOL', },
		],
	},
]
