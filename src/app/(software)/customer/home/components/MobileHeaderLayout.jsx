import Button, { ButtonCard } from "@/components/ui/Button";
import { CompanyName } from "@/constants/CompanyName";
import { servicesList } from "@/constants/services";
import { ArrowUpRight, LogInIcon, LogOutIcon, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MobileHeaderLayout({ currentService, setCurrentService }) {
	const [isLogin, setIsLogin] = useState(false);
	const [displayLogin, setDisplayLogin] = useState(false);
	const router = useRouter();

	return (
		<header className="flex flex-col gap-8 w-full py-4 border-b">
			{/* Upper Portion */}
			<div className="flex items-center justify-center w-full">
				<div className="flex justify-between items-center px-3 gap-3 w-full">
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-1 rounded-xl overflow-hidden w-8 h-8">
							<Image src={'/logo.png'} width={200} height={200} alt="Logo" />
						</div>
						<h1 className="font-bold">{CompanyName}</h1>
					</div>
					<div className="flex items-center gap-4">
						<Link href={'/customer/dashboard'} className="inline-flex gap-2 text-sm">
							<ArrowUpRight size={20} />
							Dashboard
						</Link>
						<Link href={''} onClick={() => { router.push('/login') }} className="inline-flex gap-2 text-sm">
							<UserRound size={18} />
							Logout
						</Link>
						{/*<Button
							title={'Dashboard'} icon={<ArrowUpRight />} iconPosition="right" variant={'outline'}
							onClick={() => {
								if (isLogin) {
									router.push('/customer/dashboard');
								} else {
									setDisplayLogin(true);
								}
							}}
							className="rounded-md text-sm"
						/>
						<Button title={'Login'} icon={<LogInIcon />} iconPosition="right" className="rounded-md text-sm" onClick={() => router.push('/login')} />
						*/}
					</div>
				</div>
			</div>

			{/* Services List */}
			<div className="grid grid-cols-3 p-4 gap-2 rounded-xl">
				{servicesList.map((service) => (
					<ButtonCard
						key={service.id}
						title={service.label}
						icon={<service.icon className={`h-9 w-9`} />}
						iconPosition="top"
						className={`max-w-xl bg-[var(--accent)] text-[var(--primary)] p-6 rounded-xl shadow-lg font-normal
							${currentService === service.id ? 'border-[var(--primary)] border-2 text-[var(--primary)] font-extrabold' : 'shadow-[var(--accent)]'} `}
						variant={'none'}
						onClick={() => setCurrentService(service.id)}
					/>
				))}
			</div>
		</header>
	)
}
