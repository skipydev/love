'use client'

import {
	AnimatePresence,
	motion,
	useMotionValue,
	useSpring,
} from 'framer-motion'
import {
	Activity,
	ChevronRight,
	Coffee,
	Cpu,
	Heart,
	MapPin,
	Navigation,
	Terminal,
	Zap,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const HeartCore = dynamic(() => import('./components/HeartCore'), {
	ssr: false,
})

const memories = [
	{
		id: 1,
		img: '/memories/1.jpg',
		point: '007_START',
		text: 'Тот самый день во Владимире',
	},
	{
		id: 2,
		img: '/memories/2.jpg',
		point: '007_EXPAND',
		text: 'Прогулки по набережной Твери',
	},
	{
		id: 3,
		img: '/memories/3.jpg',
		point: '007_DEPLOY',
		text: 'Воронежские закаты и мы',
	},
	{
		id: 4,
		img: '/memories/4.jpg',
		point: '007_EXTRACT',
		text: 'Посмотри насколько ты красива',
	},
]

const CustomCursor = () => {
	const cursorX = useMotionValue(-100)
	const cursorY = useMotionValue(-100)
	const [isHovered, setIsHovered] = useState(false)

	const springConfig = { damping: 25, stiffness: 150 }
	const x = useSpring(cursorX, springConfig)
	const y = useSpring(cursorY, springConfig)

	useEffect(() => {
		const moveCursor = (e: MouseEvent) => {
			cursorX.set(e.clientX)
			cursorY.set(e.clientY)
		}

		const checkHover = () => {
			const hoveredEl = document.querySelectorAll('button, a, .hover-trigger')
			hoveredEl.forEach(el => {
				el.addEventListener('mouseenter', () => setIsHovered(true))
				el.addEventListener('mouseleave', () => setIsHovered(false))
			})
		}

		window.addEventListener('mousemove', moveCursor)
		checkHover()
		return () => window.removeEventListener('mousemove', moveCursor)
	}, [cursorX, cursorY])

	return (
		<motion.div
			className='fixed top-0 left-0 pointer-events-none z-9999 text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]'
			style={{ x, y, translateX: '-50%', translateY: '-50%' }}
		>
			<motion.div
				animate={{ scale: isHovered ? 1.5 : 1, rotate: isHovered ? 15 : 0 }}
				transition={{ type: 'spring', stiffness: 300 }}
			>
				<Heart size={24} fill='currentColor' />
			</motion.div>
		</motion.div>
	)
}

export default function AnniversaryExpert() {
	const [isLetterOpen, setIsLetterOpen] = useState(false)
	const [testLog, setTestLog] = useState<string[]>(['Waiting for input...'])
	const [testResult, setTestResult] = useState(0)

	const handleTest = (val: string, score: number) => {
		setTestLog(prev => [
			...prev.slice(-3),
			`>> Selected: ${val}`,
			`>> Re-calculating devotion...`,
		])
		setTestResult(prev => Math.min(prev + score, 100))
	}

	const timelineEvents = [
		{
			date: 'АПРЕЛЬ 2025',
			title: 'ВЛАДИМИР: START',
			desc: 'Инициализация системы. Тот самый день, когда код моей жизни изменился навсегда.',
		},
		{
			date: 'ЛЕТО 2025',
			title: 'ПЕРЕСЛАВЛЬ: EXPLORE',
			desc: 'Тестирование системы в условиях новых горизонтов и бесконечного тепла.',
		},
		{
			date: 'АВГУСТ 2025',
			title: 'ТВЕРЬ: EXPAND',
			desc: 'Расширение зоны влияния. Каждая точка на карте становится нашей.',
		},
		{
			date: 'НОЯБРЬ 2025',
			title: 'ВОРОНЕЖ: DEPLOY',
			desc: 'Стабилизация системы. Доказательство того, что наше «мы» — это константа.',
		},
		{
			date: 'АПРЕЛЬ 2026',
			title: 'СЕГОДНЯ: RELOAD',
			desc: 'Система полностью синхронизирована. Готовы к запуску нового годового цикла.',
		},
	]

	return (
		<main className='min-h-screen bg-slate-950 text-orange-50 selection:bg-orange-500/30 overflow-x-hidden font-mono cursor-none'>
			<CustomCursor />

			<div
				className='absolute inset-0 opacity-10 pointer-events-none'
				style={{
					backgroundImage:
						'linear-gradient(#fb923c 1px, transparent 1px), linear-gradient(90deg, #fb923c 1px, transparent 1px)',
					backgroundSize: '100px 100px',
				}}
			/>

			<div className='relative z-14 max-w-10xl mx-10 p-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen'>
				<div className='order-2 lg:order-1'>
					<HeartCore />
					<div className='mt-4 text-center text-[10px] text-orange-500/50 uppercase tracking-widest'>
						System Status: Synchronized // Core_ID: 78_SUNSHINE
					</div>
				</div>

				<div className='order-1 lg:order-2 space-y-8'>
					<motion.div
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						className='space-y-4'
					>
						<div className='flex items-center gap-2 text-orange-500 font-bold'>
							<Cpu size={18} />
							<span>ANNIVERSARY_LOG_v1.0</span>
						</div>
						<h1 className='text-6xl font-black text-transparent bg-clip-text bg-white'>
							СЕНЯ
						</h1>
						<p className='text-slate-400 leading-relaxed text-lg border-l-2 border-orange-500/30 pl-6'>
							Инициализация системы «Солнце». Ровно 365 циклов назад была
							обнаружена аномальная доброта, скрытая за строгим интерфейсом.
							Локация первого контакта:{' '}
							<span className='text-orange-400'>Владимир</span>.
						</p>
					</motion.div>

					<div className='grid grid-cols-1 gap-4'>
						{[
							{
								icon: <MapPin size={16} />,
								label: 'Координаты',
								val: 'Воронеж / Тверь / Владимир',
							},
							{
								icon: <Heart size={16} />,
								label: 'Статус',
								val: 'Любовь уровня 10000%',
							},
							{
								icon: <Zap size={16} />,
								label: 'Энергия',
								val: 'Рыжее свечение [MAX_LEVEL]',
							},
						].map((item, i) => (
							<motion.div
								key={i}
								whileHover={{ scale: 1.02, x: 10 }}
								className='bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4 hover:bg-orange-500/10 transition-all hover-trigger'
							>
								<div className='text-orange-500'>{item.icon}</div>
								<div>
									<div className='text-[10px] text-slate-500 uppercase'>
										{item.label}
									</div>
									<div className='text-sm font-bold tracking-tight'>
										{item.val}
									</div>
								</div>
							</motion.div>
						))}
					</div>

					<motion.button
						onClick={() => setIsLetterOpen(true)}
						whileHover={{
							scale: 1.02,
							boxShadow: '0 0 30px rgba(249, 115, 22, 0.4)',
						}}
						whileTap={{ scale: 0.98 }}
						className='w-full py-4 border border-orange-500 text-orange-500 font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all group relative z-20'
					>
						ВЫПОЛНИТЬ: РАЗВЕРНУТЬ{' '}
						<span className='group-hover:ml-2 transition-all'>→</span>
					</motion.button>
				</div>
			</div>
			<section className='relative z-10 max-w-6xl mx-auto px-8 py-24'>
				<div className='bg-slate-900/50 border border-orange-500/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm'>
					<div className='flex flex-col md:flex-row gap-12'>
						<div className='flex-1 space-y-6'>
							<div className='flex items-center gap-2 text-orange-500 font-bold'>
								<Terminal size={20} />
								<span className='tracking-tighter'>
									ROOT@SUNSHINE:~# ./love_test.exe
								</span>
							</div>
							<h2 className='text-4xl font-black uppercase italic'>
								Проверка совместимости ядер
							</h2>
							<div className='space-y-4'>
								{[
									{ t: 'Бесконечная поддержка 24/7', s: 30 },
									{ t: 'Совместное поедание вкусняшек', s: 25 },
									{ t: 'Сон под одним одеялом', s: 45 },
								].map((opt, i) => (
									<button
										key={i}
										onClick={() => handleTest(opt.t, opt.s)}
										className='w-full text-left p-4 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all hover:bg-orange-500/5 group hover-trigger'
									>
										<div className='flex justify-between items-center'>
											<span>{opt.t}</span>
											<ChevronRight
												size={16}
												className='opacity-0 group-hover:opacity-100 transition-opacity'
											/>
										</div>
									</button>
								))}
							</div>
						</div>
						<div className='w-full md:w-80 space-y-6'>
							<div className='bg-black/40 rounded-xl p-6 border border-white/5 font-mono text-[11px] h-62 flex flex-col justify-end'>
								<div className='space-y-1 text-orange-500/70'>
									{testLog.map((log, i) => (
										<div key={i}>{log}</div>
									))}
								</div>
							</div>
							<div className='space-y-2'>
								<div className='flex justify-between text-[10px] uppercase font-bold tracking-widest'>
									<span>Devotion_Level</span>
									<span>{testResult}%</span>
								</div>
								<div className='h-2 bg-white/10 rounded-full overflow-hidden'>
									<motion.div
										animate={{ width: `${testResult}%` }}
										className='h-full bg-linear-to-r from-orange-600 to-red-500'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className='relative z-10 py-24 overflow-hidden'>
				<div className='max-w-6xl mx-auto px-8'>
					<div className='flex items-center gap-4 mb-16'>
						<Activity className='text-orange-500' />
						<h2 className='text-2xl font-bold uppercase tracking-tighter'>
							Хроника синхронизации
						</h2>
					</div>
					<div className='relative space-y-16'>
						<div className='absolute left-4.75 top-2 bottom-2 w-px bg-linear-to-b from-orange-500/50 via-orange-500/20 to-transparent md:left-1/2 md:-ml-px' />
						{timelineEvents.map((event, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
							>
								<div className='flex items-center justify-center w-10 h-10 rounded-full bg-slate-950 border-2 border-orange-500 z-10 shrink-0 md:absolute md:left-1/2 md:-ml-5 transition-transform group-hover:scale-125'>
									<div className='w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_#fb923c]' />
								</div>
								<div className='w-[calc(100%-60px)] md:w-[45%] p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 transition-all'>
									<span className='text-orange-500 text-[10px] font-black tracking-widest'>
										{event.date}
									</span>
									<h3 className='text-xl font-black italic mt-1'>
										{event.title}
									</h3>
									<p className='text-slate-400 text-sm mt- leading-relaxed'>
										{event.desc}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>
			<section className='relative z-10 max-w-6xl mx-auto px-8 py-24 border-t border-white/5'>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
					{[
						{ label: 'Дней в сети', val: '365', icon: <Zap size={20} /> },
						{
							label: 'Города',
							val: 'Еще впереди',
							icon: <Navigation size={20} />,
						},
						{ label: 'Уровень счастья', val: '∞ %', icon: <Heart size={20} /> },
						{
							label: 'Кофе не любит!',
							val: 'Error!',
							icon: <Coffee size={20} />,
						},
					].map((stat, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							whileHover={{
								y: -10,
								borderColor: '#fb923c',
								backgroundColor: 'rgba(251,146,60,0.05)',
							}}
							className='p-6 rounded-2xl bg-white/5 border border-white/10 hover-trigger transition-all hover-trigger'
						>
							<div className='text-orange-500 mb-4'>{stat.icon}</div>
							<div className='flex flex-col gap-1'>
								{' '}
								<div className='flex items-center gap-1.5'>
									<div className='text-2xl font-black italic tracking-tighter text-white'>
										{stat.val}
									</div>
									{i === 2 && <span className='text-orange-500 text-xl'></span>}
								</div>
								<div className='text-[10px] text-slate-500 uppercase tracking-widest whitespace-normal leading-relaxed'>
									{stat.label}
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</section>
			<section className='relative z-10 py-24'>
				<div className='max-w-6xl mx-auto px-8'>
					<p className='text-orange-500 text-[10px] mb-4 uppercase tracking-widest'>
						Visual_Memory_Archive
					</p>

					<div className='flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x'>
						{memories.map(item => (
							<motion.div
								key={item.id}
								whileHover={{ y: -10 }}
								className='min-w-75 h-96 bg-slate-900 rounded-3xl border border-white/10 snap-center flex items-center justify-center group relative overflow-hidden hover-trigger'
							>
								<Image
									src={item.img}
									alt={item.text}
									fill
									className='absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500'
								/>
								<div className='absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-80' />
								<div className='absolute bottom-6 left-6 right-6 z-20'>
									<div className='text-xs text-orange-400 font-bold mb-1'>
										POINT_{item.point}
									</div>
									<div className='text-sm text-white opacity-90 italic'>
										«{item.text}»
									</div>
								</div>

								<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 text-6xl font-black pointer-events-none'>
									MEM_{item.id}
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			<footer className='relative z-10 py-24 text-center border-t border-white/5'>
				<div className='text-4xl font-black extrabold text-white italic tracking-tighter uppercase'>
					я люблю тебя!
				</div>
				<div className='pt-12 text-[10px] text-slate-800 tracking-[0.5em] uppercase'>
					Designed for Sunshine // 007 // 2026
				</div>
			</footer>

			<AnimatePresence>
				{isLetterOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md'
					>
						<motion.div
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							className='bg-orange-50 text-slate-900 p-8 md:p-12 rounded-2xl max-w-2xl w-full relative border-t-8 border-orange-500 shadow-2xl'
						>
							<button
								onClick={() => setIsLetterOpen(false)}
								className='absolute top-4 right-4 text-slate-400 hover:text-orange-600 font-bold text-[10px]'
							>
								[ CLOSE ]
							</button>
							<div className='space-y-6'>
								<div className='flex items-center gap-2 text-orange-600 font-bold text-xs uppercase'>
									Incoming Message: Success
								</div>
								<h2 className='text-3xl font-black'>Моему рыжему солнцу </h2>
								<div className='text-lg space-y-4 font-serif italic'>
									<p>Сенечка, любимая...</p>
									<p>
										Сегодня нашему &quot;мы&quot; исполнился ровно год.
										Владимир, Переславль, Тверь, Воронеж, Питер — неважно, где
										мы, главное, что вместе.
									</p>
									<p>
										Я готов проехать любые расстояния, лишь бы увидеть твою
										улыбку. Ты — моё тепло и моя бесконечная удача.
									</p>
									<p className='text-right font-bold not-italic'>— М.</p>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</main>
	)
}
