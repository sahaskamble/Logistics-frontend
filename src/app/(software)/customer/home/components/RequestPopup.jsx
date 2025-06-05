import Button from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog'
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import { useAuth } from '@/contexts/AuthContext';
import { useCollection } from '@/hooks/useCollection';
import React, { useState } from 'react'
import { toast } from 'sonner';

export function RequestPopup({ provider }) {
	const { createItem } = useCollection('cfs_pricing_request');
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState({
		preferableRate: '',
		noOfContainers: '',
		avgContainerSize: '',
		containersPerMonth: '',
		type: 'Normal',
		status: 'Pending'
	});
	const { user } = useAuth();

	const handleReset = () => {
		setFormData({
			preferableRate: '',
			noOfContainers: '',
			avgContainerSize: '',
			containersPerMonth: '',
			type: 'Normal',
			status: 'Pending'
		});
	};

	const handleNumberChange = (e) => {
		const { name, value } = e.target;
		try {
			if (value !== '') {
				setFormData((prev) => ({
					...prev,
					[name]: value,
				}));
			} else if (!isNaN(value)) {
				setFormData((prev) => ({
					...prev,
					[name]: parseInt(value),
				}));
			} else {
				setFormData((prev) => ({
					...prev,
					[name]: '',
				}));
			}

		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(user);
		console.log('Form submitted:', formData);
		try {
			await createItem({
				preferableRate: formData.preferableRate,
				noOfContainers: formData.noOfContainers,
				avgContainerSize: formData.avgContainerSize,
				containersPerMonth: formData.containersPerMonth,
				type: formData.type,
				user: user.id,
				serviceProvider: provider,
				status: formData.status,
			});
			toast.success("Request sent successfully we'll contact you soon....");
		} catch (error) {
			console.log(error)
			toast.error(error.message);
		} finally {
			handleReset();
			setIsOpen(false);
		}
	};

	return (
		<Dialog
			title={'Request Pricing'}
			open={isOpen}
			onOpenChange={setIsOpen}
			trigger={<Button title={'Request Price'} className="rounded-md" />}
		>
			<div className='md:w-[40dvw] grid gap-4'>
				<div className='flex flex-col gap-2'>
					<Label title={'Preferable Rate'} />
					<Input
						type="number"
						name="preferableRate"
						value={formData.preferableRate}
						onChange={handleNumberChange}
						placeholder="Enter Preferable Rate"
						className='bg-accent'
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<Label title={'No of Containers for the Order'} />
					<Input
						type="number"
						name="noOfContainers"
						value={formData.noOfContainers}
						onChange={handleNumberChange}
						placeholder="Enter No of Containers for the Order"
						className='bg-accent'
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<Label title={'Avg. Container Size'} />
					<Input
						type="number"
						name="avgContainerSize"
						value={formData.avgContainerSize}
						onChange={handleNumberChange}
						placeholder="Enter Avg. Container Size"
						className='bg-accent'
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<Label title={'No. of Containers Movement per month'} />
					<Input
						type="number"
						name="containersPerMonth"
						value={formData.containersPerMonth}
						onChange={handleNumberChange}
						placeholder="Enter No. of Containers Movement per month"
						className='bg-accent'
					/>
				</div>

				<div className='flex'>
					<Button title={'Request Pricing'} className='rounded-md' onClick={handleSubmit} />
				</div>
			</div>
		</Dialog>
	)
}

