"use client";

// SEO Keywords: essay writers, professional writers, scholarship essay writing service, argumentative essay writing service, college essay writing

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Mail, Phone } from 'lucide-react';

const writers = [
	{
		id: 1,
		name: 'Cole Raphael',
		rating: 4.9,
		status: 'Online now',
		successRate: 98,
		completed: 512,
		reviews: 217,
		degree: 'Msc. Computer Science',
		competences: [
			'Programming',
			'Artificial Intelligence',
			'Data Structures',
		],
		review: {
			userId: '#518333',
			text: 'Cole delivered a brilliant analysis of postmodern literature that exceeded all my expectations. The depth of insight was remarkable.',
		},
		image: '/cole.jpg',
		email: 'cole.raphael@proessayworks.com',
		whatsapp: '+19149016306',
	},
	{
		id: 2,
		name: 'Gabriel Whitney',
		rating: 5.0,
		status: 'Away',
		successRate: 100,
		completed: 389,
		reviews: 184,
		degree: 'M.Sc. in Biological Sciences',
		competences: ['Genetics', 'Microbiology', 'Ecology'],
		review: {
			userId: '#519844',
			text: "Whitney's research on genetic markers was comprehensive and perfectly formatted. I received an A+ on my thesis proposal.",
		},
		image: '/gabriel.jpg',
		email: 'gabriel.whitney@proessayworks.com',
		whatsapp: '+12068553599',
	},
	{
		id: 3,
		name: 'Darwin Victor',
		rating: 4.8,
		status: 'Online now',
		successRate: 97,
		completed: 621,
		reviews: 305,
		degree: 'MBA in Finance',
		competences: [
			'Corporate Finance',
			'Investment Analysis',
			'Economic Policy',
		],
		review: {
			userId: '#520911',
			text: 'Victor crafted a flawless financial analysis that impressed my professor. His attention to detail is exceptional.',
		},
		image: '/victor.jpg',
		email: 'darwin.victor@proessayworks.com',
		whatsapp: '+19852873428',
	},
	{
		id: 4,
		name: 'Elvis Ruben',
		rating: 4.9,
		status: 'Offline',
		successRate: 99,
		completed: 437,
		reviews: 192,
		degree: 'Ph.D. in Physics',
		competences: [
			'Quantum Mechanics',
			'Astrophysics',
			'Material Science',
		],
		review: {
			userId: '#517422',
			text: 'Elvis explained complex quantum concepts with remarkable clarity. My paper was praised for its originality and depth.',
		},
		image: '/elvis.jpg',
		email: 'elvis.ruben@proessayworks.com',
		whatsapp: '+254702304046',
	},
	{
		id: 5,
		name: 'Sophia Chen',
		rating: 5.0,
		status: 'Online now',
		successRate: 100,
		completed: 284,
		reviews: 132,
		degree: 'M.A. in History',
		competences: [
			'European History',
			'Historiography',
			'Cultural Studies',
		],
		review: {
			userId: '#521567',
			text: "Sophia's historical analysis was both insightful and engaging. She transformed a dry topic into a fascinating narrative.",
		},
		image: '/sophia.jpg',
		email: 'sophia.chen@proessayworks.com',
		whatsapp: '+254796871876',
	},
	{
		id: 6,
		name: 'Marcus Johnson',
		rating: 4.7,
		status: 'Away',
		successRate: 96,
		completed: 398,
		reviews: 187,
		degree: 'J.D. in Law',
		competences: [
			'Constitutional Law',
			'International Law',
			'Legal Writing',
		],
		review: {
			userId: '#522489',
			text: 'Marcus crafted a compelling legal argument that was both persuasive and impeccably researched. Highly recommended!',
		},
		image: '/marcus.jpg',
		email: 'marcus.johnson@proessayworks.com',
		whatsapp: '+19149016306',
	},
];

const Writers = () => {
	const [currentWriter, setCurrentWriter] = useState(0);
	const [showContactModal, setShowContactModal] = useState(false);

	const nextWriter = () => {
		setCurrentWriter((prev) =>
			prev === writers.length - 1 ? 0 : prev + 1
		);
	};

	const prevWriter = () => {
		setCurrentWriter((prev) =>
			prev === 0 ? writers.length - 1 : prev - 1
		);
	};

	const handleHireWriter = () => {
		setShowContactModal(true);
	};

	const handleContactMethod = (method) => {
		const writer = writers[currentWriter];
		if (method === 'email') {
			window.location.href = `mailto:${writer.email}?subject=Writing Assignment Request&body=Hello ${writer.name},%0D%0A%0D%0AI would like to discuss a writing assignment with you.%0D%0A%0D%0APlease let me know your availability.%0D%0A%0D%0AThank you!`;
		} else if (method === 'whatsapp') {
			window.open(
				`https://wa.me/${writer.whatsapp.replace(
					'+',
					''
				)}?text=Hello ${writer.name}, I would like to discuss a writing assignment with you.`,
				'_blank'
			);
		}
		setShowContactModal(false);
	};

	const writer = writers[currentWriter];

	return (
		<section
			className="bg-gradient-to-b from-indigo-50 to-indigo-50 min-h-screen py-12 px-4 sm:px-6"
			aria-label="Meet Our Writers"
		>
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						Get help from actual writers
					</h1>
					<p className="text-lg text-gray-700 max-w-3xl mx-auto">
						Work with verified paper writers who understand academic standards,
						follow your guidelines, and deliver top-quality work without using AI
						tools.
					</p>
				</div>
				<div className="bg-white rounded-2xl shadow-xl overflow-hidden">
					<div className="md:flex">
						{/* Writer Profile Section */}
						<article
							className="md:w-2/5 p-8 border-r border-gray-200"
							aria-label={`Profile of ${writer.name}`}
						>
							<div className="flex items-center mb-6">
								<Image
									src={writer.image}
									alt={`${writer.name} - ProEssayWorks academic writer profile photo`}
									width={64}
									height={64}
									className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
									priority
								/>
								<div className="ml-4">
									<h2 className="text-2xl font-bold text-gray-900">
										{writer.name}
									</h2>
									<div className="flex items-center mt-1">
										<div className="flex text-yellow-400" aria-hidden="true">
											{[...Array(5)].map((_, i) => (
												<svg
													key={i}
													className="w-5 h-5 fill-current"
													viewBox="0 0 24 24"
												>
													<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
												</svg>
											))}
										</div>
										<span className="ml-2 text-gray-700">
											{writer.rating} Rating
										</span>
									</div>
									<span
										className={`mt-1 text-sm font-medium ${
											writer.status === 'Online now'
												? 'text-green-600'
												: writer.status === 'Away'
												? 'text-yellow-600'
												: 'text-gray-500'
										}`}
									>
										{writer.status}
									</span>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4 mb-8">
								<div className="bg-indigo-50 rounded-lg p-4">
									<p className="text-sm text-gray-600">Success rate</p>
									<p className="text-2xl font-bold text-indigo-700">
										{writer.successRate}%
									</p>
								</div>
								<div className="bg-indigo-50 rounded-lg p-4">
									<p className="text-sm text-gray-600">Others completed</p>
									<p className="text-2xl font-bold text-indigo-700">
										{writer.completed}
									</p>
								</div>
								<div className="bg-indigo-50 rounded-lg p-4">
									<p className="text-sm text-gray-600">Reviews</p>
									<p className="text-2xl font-bold text-indigo-700">
										{writer.reviews}
									</p>
								</div>
								<div className="bg-indigo-50 rounded-lg p-4">
									<p className="text-sm text-gray-600">Degree</p>
									<p className="text-lg font-bold text-indigo-700">
										{writer.degree}
									</p>
								</div>
							</div>

							<div className="mb-8">
								<h3 className="text-lg font-semibold text-gray-900 mb-3">
									Best Competences
								</h3>
								<div className="flex flex-wrap gap-2">
									{writer.competences.map((competence, index) => (
										<span
											key={index}
											className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full"
										>
											{competence}
										</span>
									))}
								</div>
							</div>

							<button
								onClick={handleHireWriter}
								className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-full transition-colors duration-300"
							>
								Hire writer
							</button>
						</article>
						{/* Review and About Section */}
						<section
							className="md:w-3/5 p-8"
							aria-label="Writer Review and About"
						>
							<div className="mb-10">
								<h3 className="text-xl font-bold text-gray-900 mb-4">
									Recent review about this writer
								</h3>
								<blockquote className="bg-indigo-50 rounded-xl p-6">
									<div className="flex justify-between items-start mb-4">
										<span className="text-sm font-medium text-gray-600">
											User ID: {writer.review.userId}
										</span>
										<div className="flex text-yellow-400" aria-hidden="true">
											{[...Array(5)].map((_, i) => (
												<svg
													key={i}
													className="w-4 h-4 fill-current"
													viewBox="0 0 24 24"
												>
													<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
												</svg>
											))}
										</div>
									</div>
									<p className="text-gray-700 italic">
										"{writer.review.text}"
									</p>
								</blockquote>
							</div>

							<div className="mb-10">
								<h3 className="text-xl font-bold text-gray-900 mb-4">
									About writer
								</h3>
								<p className="text-gray-700">
									{writer.name} is a highly skilled academic writer with a{' '}
									{writer.degree.toLowerCase()} and extensive experience in
									their field. They have successfully completed over{' '}
									{writer.completed} papers with a {writer.successRate}% satisfaction
									rate. Specializing in{' '}
									{writer.competences.slice(0, 2).join(' and ')}, they bring
									deep subject expertise and meticulous attention to detail to
									every assignment. Their work consistently receives praise for
									its originality, depth of research, and adherence to academic
									standards.
								</p>
							</div>

							<div className="flex justify-between">
								<Link
									href="/writers"
									className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
								>
									View all writers
									<svg
										className="w-4 h-4 ml-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</Link>

								<div className="flex space-x-4">
									<button
										onClick={prevWriter}
										className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
										aria-label="Previous writer"
									>
										<svg
											className="w-6 h-6 text-gray-700"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 19l-7-7 7-7"
											/>
										</svg>
									</button>
									<button
										onClick={nextWriter}
										className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
										aria-label="Next writer"
									>
										<svg
											className="w-6 h-6 text-gray-700"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</button>
								</div>
							</div>
						</section>
					</div>
				</div>

				{/* Writer thumbnails */}
				<div className="mt-8 flex justify-center flex-wrap gap-4">
					{writers.map((writer, index) => (
						<button
							key={writer.id}
							onClick={() => setCurrentWriter(index)}
							className={`flex flex-col items-center p-3 rounded-lg ${
								currentWriter === index
									? 'bg-indigo-100 border-2 border-indigo-500'
									: 'bg-gray-100'
							}`}
						>
							<Image
								src={writer.image}
								alt={`${writer.name} - ProEssayWorks academic writer thumbnail`}
								width={48}
								height={48}
								className="w-12 h-12 rounded-full object-cover border-2 border-dashed border-gray-300 mb-2"
							/>
							<span className="text-sm font-medium">
								{writer.name.split(' ')[0]}
							</span>
							<div className="flex text-yellow-400 mt-1">
								{[...Array(Math.floor(writer.rating))].map((_, i) => (
									<svg
										key={i}
										className="w-3 h-3 fill-current"
										viewBox="0 0 24 24"
									>
										<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
									</svg>
								))}
							</div>
						</button>
					))}
				</div>
			</div>

			{/* Contact Modal */}
			{showContactModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl p-6 w-full max-w-md">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-xl font-semibold">Contact {writer.name}</h3>
							<button
								onClick={() => setShowContactModal(false)}
								className="text-gray-400 hover:text-gray-600"
							>
								<X className="w-6 h-6" aria-hidden="true" />
							</button>
						</div>

						<div className="mb-6">
							<div className="flex items-center gap-4 mb-4">
								<Image
									src={writer.image}
									alt={`${writer.name} - ProEssayWorks academic writer profile photo`}
									width={64}
									height={64}
									className="w-16 h-16 rounded-full object-cover"
								/>
								<div>
									<h4 className="font-semibold">{writer.name}</h4>
									<p className="text-sm text-gray-600">{writer.degree}</p>
									<div
										className="flex items-center gap-1"
										aria-hidden="true"
									>
										{[...Array(5)].map((_, i) => (
											<svg
												key={i}
												className="w-4 h-4 text-yellow-400 fill-current"
												viewBox="0 0 24 24"
											>
												<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
											</svg>
										))}
									</div>
								</div>
							</div>
							<p className="text-gray-600 text-sm">
								Choose how you&apos;d like to contact this writer:
							</p>
						</div>

						<div className="space-y-3">
							<button
								onClick={() => handleContactMethod('email')}
								className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
							>
								<Mail className="w-6 h-6 text-indigo-500" />
								<div className="text-left">
									<div className="font-medium">Send Email</div>
									<div className="text-sm text-gray-600">
										{writer.email}
									</div>
								</div>
							</button>

							<button
								onClick={() => handleContactMethod('whatsapp')}
								className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
							>
								<Phone className="w-6 h-6 text-green-500" />
								<div className="text-left">
									<div className="font-medium">WhatsApp</div>
									<div className="text-sm text-gray-600">
										{writer.whatsapp}
									</div>
								</div>
							</button>
						</div>

						<button
							onClick={() => setShowContactModal(false)}
							className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</section>
	);
};

export default Writers;