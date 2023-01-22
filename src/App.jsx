import qr from './assets/images/qr.jpg';
import ruStore from './assets/images/rustore.jpg';

function App() {
	return (
		<div className='flex flex-col justify-center w-[80%] m-auto min-[320px]:pb-8'>
			<div className='text-center'>
				<h1 className='font-black text-white min-[320px]:text-[20px] min-[900px]:text-[40px] '>
					<span className='text-[#3eb59f]'>Schedule </span> автоматически берет
					расписание занятий. Вам лишь нужно войти или создать аккаунт.{' '}
					<span className='text-[#3eb59f]'>Schedule </span>- лучшее приложение с
					расписанием занятий.
				</h1>
			</div>
			<div className='mt-[30px] mb-[30px] flex items-center justify-center min-[320px]:flex-col min-[320px]:items-center min-[900px]:flex-row'>
				<h3 className='text-[#3eb59f] text-[30px] font-black min-[320px]:text-[20px] min-[320px]:mb-7 min-[320px]:text-center min-[320px]:mr-0 min-[900px]:mr-10 min-[320px]:w-[100%] min-[900px]:w-[50%] min-[900px]:text-[30px]'>
					Отсканируй QR код чтобы скачать приложение или перейди по ссылке
				</h3>
				<img className='w-[300px] h-[300px]' src={qr} alt='qr код' />
			</div>
			<a
				href='https://apps.rustore.ru/app/com.thirdTeam.schedule'
				className='flex m-auto mt-0 min-[320px]:w-[250px] min-[900px]:w-[300px]'>
				<button className='group flex bg-white w-[100%] m-auto rounded-2xl items-center hover:bg-[#3eb59f] transition-all'>
					<img
						className='w-[100px] h-[100px] rounded-l-[16px]'
						src={ruStore}
						alt=''
					/>
					<span className='font-black text-black text-[20px] ml-4 group-hover:text-white'>
						RuStore
					</span>
				</button>
			</a>
		</div>
	);
}

export default App;
