import { NavLink } from "react-router-dom";

export default function Navbar() {
	const items = [
		{ to: '/', label: 'Home' },
		{ to: '/faqs', label: 'FAQs' },
		{ to: '/register', label: 'Register' },
		{ to: '/admin', label: 'Admin Portal' },
	];

	return (
		<nav className="bg-white shadow-sm border-b border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="text-blue-700 font-semibold">Rainwater Convention</div>
					<ul className="flex gap-6">
						{items.map((item) => (
							<li key={item.to}>
								<NavLink
									to={item.to}
									className={({ isActive }) =>
										`transition-colors ${isActive ? 'text-blue-700' : 'text-gray-600 hover:text-blue-700'}`
									}
								>
									{item.label}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
}
