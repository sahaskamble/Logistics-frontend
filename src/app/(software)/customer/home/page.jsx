'use client';

import { useEffect, useState } from "react";
import HeaderLayout from "./components/HeaderLayout";
import MobileHeaderLayout from "./components/MobileHeaderLayout";
import { ServiceProviders, servicesList } from "@/constants/services";
import Button from "@/components/ui/Button";
import { SlidersHorizontalIcon, Star, MapPin, ChevronLeft, ChevronRight, Search, } from 'lucide-react';
import Image from "next/image";
import { Dialog } from "@/components/ui/Dialog";
import { FilterCFS } from "./components/Filter";
import { useIsMobile } from "@/hooks/use-mobile";
import { Select, SelectItem } from "@/components/ui/Select";
import LoginPopUp from "./components/LoginPopUp";
import { useCollection } from "@/hooks/useCollection";
import RenderRatings from "@/components/ui/renderRatings";
import { PB_URL } from "@/constants/url";
import { RequestPopup } from "./components/RequestPopup";
import UrgentRequestPopup from "./components/UrgentRequestPopup";

export default function ClientHomePage() {
	const { data: providers } = useCollection('service_provider', {
		expand: 'service'
	});
	const [currentService, setCurrentService] = useState('CFS');
	const [filteredServices, setFilteredServices] = useState([]);
	const [filter, setFilter] = useState('');
	const [SearchQuery, setSearchQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [isPopup, setIsPopup] = useState(false);

	const checkShouldShoPopup = ()=>{
		const now = Date.now();

		const closeClickTime = parseInt(localStorage.getItem('popupCloseAt') || '0', 10);
		const escCloseTime = parseInt(localStorage.getItem('popupEscClosedAt') || '0', 10);

		const fiveMinutes = 5 * 60 * 1000;
		const oneMinute = 60* 1000;

		const isWithCloseClickLimit = now - closeClickTime < fiveMinutes;
		const isWithEscLimit = now - escCloseTime < oneMinute;

		if (isWithCloseClickLimit || isWithEscLimit) {
			setIsPopup(false);
		} else {
			setIsPopup(true);
		}
	};

	useEffect(() => {
		if (providers?.length > 0) {
			setFilteredServices(providers);
			console.log('Providers', providers);
		}
	}, [currentService, SearchQuery, providers]);

	useEffect(()=>{
		const initialTimeOut = setTimeout(() => {
			checkShouldShoPopup();
		}, 25000);

		const interval = setInterval(() => {
			checkShouldShoPopup();
		}, 10000);

		const handleEsc = (e) => {
			if (e.key === "Escape") {
				setIsPopup(false);
				localStorage.setItem('popupEscClosedAt', Date.now().toString());
			}
		};

		window.addEventListener('keydown', handleEsc);

		return ()=>{
			clearTimeout(initialTimeOut);
			clearInterval(interval);
			window.removeEventListener('keydown', handleEsc);
		}
	},[])


	const handlePopUpClose = () => {
		setIsPopup(false);
		localStorage.setItem('popupClosedAt', Date.now().toString());
	}

	return (
		<section className={`w-full h-auto items-center justify-center`}>
			{/* -- Services List -- */}
			{
				useIsMobile() ?
					<MobileHeaderLayout currentService={currentService} setCurrentService={setCurrentService} />
					:
					<HeaderLayout currentService={currentService} setCurrentService={setCurrentService} />
			}

			<section className="p-4">
				<div className="flex items-center justify-between">
					<h1 className="font-bold text-2xl">{currentService} Service Providers</h1>
					<Dialog
						trigger={<Button title={'Filters'} icon={<SlidersHorizontalIcon size={20} />} variant={''} iconPosition="right" className="rounded-md bg-[var(--primary)]" />}
						title="Filters"
						open={isOpen}
						onOpenChange={setIsOpen}
					>
						<FilterCFS openDialog={setIsOpen} />
					</Dialog>
				</div>

				{/* Search */}
				<div className="flex items-center justify-between gap-4 w-full mt-10">
					<div className="flex items-center justify-between gap-4 w-full">
						<div className="flex items-center justify-between relative gap-4 w-full">
							<Search className="absolute left-2 top-2 p-1 h-6 w-6 text-muted-foreground" />
							<input
								className={`flex pl-10 h-11 w-full bg-[var(--accent)] rounded-md border border-input text-[var(--foreground)] px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--foreground)] placeholder:text-[var(--secondary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
								placeholder={!useIsMobile() ? `Search ${currentService} Service Providers...` : 'Search'}
								value={SearchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<Select value={filter} onValueChange={(value) => setFilter(value)} placeholder="-- Search By --" className='h-11'>
							<SelectItem value={'title'}> By Name </SelectItem>
							<SelectItem value={'location'}> By Location </SelectItem>
						</Select>
					</div>
				</div>

				{/* -- Providers List -- */}
				<div className="flex flex-col md:gap-10 gap-4 pt-6">
					{filteredServices.map((provider) => (
						<ServiceCard
							key={provider.id}
							title={provider.title}
							location={provider.location}
							rating={provider?.rating || 0}
							tags={provider.tags.tags}
							description={provider.description}
							images={provider.files || []}
							id={provider.id}
						/>
					))}
				</div>
			</section>
			{
				isPopup && <LoginPopUp onOpen={handlePopUpClose} />
			}
		</section >
	)
}

const ServiceCard = ({ title, location, rating, tags, description, images, id }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev + 1) % images.length);
	};
	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	return (
		<div className="flex flex-col bg-[var(--accent)] md:flex-row rounded-lg shadow-md overflow-hidden border min-h-96 p-4 md:p-8 gap-10">
			{/* Left side - Image slider */}
			<div className="relative w-full md:w-2/5 md:h-96 h-64 rounded-xl overflow-hidden">
				{
					images?.length > 0 && (
						<Image
							src={`${PB_URL}/api/files/service_provider/${id}/${images[currentImageIndex]}`}
							alt={`${title} - Image ${currentImageIndex + 1}`}
							width={5000}
							height={5000}
							className="w-full h-full object-cover"
						/>
					)
				}

				{/* Image navigation buttons */}

				<div className="absolute inset-y-0 left-0 w-full h-full bg-black/30" />
				<div className="absolute inset-y-0 left-1 flex items-center">
					<button
						onClick={prevImage}
						className="bg-[var(--background)] p-2 rounded-full"
						aria-label="Previous image"
					>
						<ChevronLeft className="h-5 w-5" />
					</button>
				</div>
				<div className="absolute inset-y-0 right-0 flex items-center">
					<button
						onClick={nextImage}
						className="bg-[var(--background)] p-2 rounded-full"
						aria-label="Next image"
					>
						<ChevronRight className="h-5 w-5" />
					</button>
				</div>

				{/* Image counter */}
				<div className="absolute bottom-2 right-2 bg-[var(--background)] bg-opacity-50 text-xs font-bold px-2 py-1 rounded-full">
					{currentImageIndex + 1}/{images.length}
				</div>
			</div>

			{/* Right side - Information */}
			<div className="p-4 flex flex-col justify-between w-full md:w-3/5">
				<div>
					<h3 className="text-2xl font-semibold">{title}</h3>
					<div className="flex items-center mt-2 text-gray-600">
						<MapPin className="mr-1 w-5 h-5" />
						<span className="">{location}</span>
					</div>
					<div className="flex flex-wrap items-center gap-4 mt-4 text-gray-600">
						{
							tags.map((tag) => (
								<Button key={tag} title={tag} variant={'secondary'} className="rounded-md text-xs bg-[--var(--accent)]" />
							))
						}
					</div>
					<div className="flex items-center mt-6">
						<RenderRatings rating={rating.toFixed(1)} />
						<span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
					</div>
					<p className="mt-6">{description}</p>
				</div>
				<div className="flex flex-wrap gap-4 mt-4">
					<RequestPopup provider={id} />
					<UrgentRequestPopup provider={id} />
					<Button title={'View Details'} className="rounded-md" />
				</div>
			</div>
		</div>
	);

}
