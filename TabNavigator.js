import { Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import * as CardStyleInterpolates from '@react-navigation/stack/src/TransitionConfigs/CardStyleInterpolators';

import HomeScreen from './app/screens/Home/HomeScreen';
import MenuScreen from './app/screens/Menu/MenuScreen';
import Search from './app/screens/Search/Search';
import PairInfo from './app/screens/Home/PairInfo';
import NotesScreen from './app/screens/NotesScreen';
import LinksScreen from './app/screens/Menu/LinksScreen';
import SchedScreen from './app/screens/Menu/SchedScreen';
import PremiumScreen from './app/screens/Menu/PremiumScreen';
import FAQScreen from './app/screens/Menu/FAQScreen';
import SearchGroup from './app/screens/Search/SearchGroup';
import SearchAudition from './app/screens/Search/SearchAudition';
import SearchTeachers from './app/screens/Search/SearchTeachers';
import ServicesScreen from './app/screens/Services/ServicesScreen';
import Chat from './app/screens/Services/Chat';
import ChatHeader from './app/components/Chat/ChatHeader';
import ContactProfile from './app/components/Contacts/ContactProfile';
import ContactProfileHeader from './app/components/Contacts/ContactProfileHeader';
import UserInfoScreen from './app/screens/Menu/UserInfoScreen';
import HomeHeader from './app/components/ScreensHeaders/HomeStack/HomeHeader';
import InfoHeader from './app/components/ScreensHeaders/HomeStack/InfoHeader';
import MenuHeader from './app/components/ScreensHeaders/MenuStack/MenuHeader';
import UserInfoHeader from './app/components/ScreensHeaders/MenuStack/UserInfoHeader';
import SchedHeader from './app/components/ScreensHeaders/MenuStack/SchedHeader';
import LinksHeader from './app/components/ScreensHeaders/MenuStack/LinksHeader';
import PremiumHeader from './app/components/ScreensHeaders/MenuStack/PremiumHeader';
import FAQHeader from './app/components/ScreensHeaders/MenuStack/FAQHeader';
import SearchHeader from './app/components/ScreensHeaders/SearchStack/SearchHeader';
import SearchGroupHeader from './app/components/ScreensHeaders/SearchStack/SearchGroupHeader';
import SearchAuditionHeader from './app/components/ScreensHeaders/SearchStack/SearchAuditionHeader';
import SearchTeachersHeader from './app/components/ScreensHeaders/SearchStack/SearchTeachersHeader';
import NotesHeader from './app/components/ScreensHeaders/NotesStack/NotesHeader';
import ServicesHeader from './app/components/ScreensHeaders/ServicesStack/ServicesHeader';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const { width } = Dimensions.get('screen');

const HomeStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				cardStyleInterpolator: CardStyleInterpolates.forHorizontalIOS
			}}>
			<Stack.Screen
				name='Home'
				component={HomeScreen}
				options={{
					header: props => <HomeHeader {...props} />
				}}
			/>
			<Stack.Screen
				name='Info'
				component={PairInfo}
				options={{
					header: props => <InfoHeader {...props} />
				}}
			/>
		</Stack.Navigator>
	);
};

const MenuStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				cardStyleInterpolator: CardStyleInterpolates.forHorizontalIOS
			}}>
			<Stack.Screen
				name='Menu'
				component={MenuScreen}
				options={{
					header: props => <MenuHeader width={width} {...props} />
				}}
			/>
			<Stack.Screen
				name='UserInfo'
				component={UserInfoScreen}
				options={{
					header: props => <UserInfoHeader {...props} />
				}}
			/>
			<Stack.Screen
				name='Sched'
				component={SchedScreen}
				options={{
					header: props => <SchedHeader {...props} />
				}}
			/>
			<Stack.Screen
				name='Links'
				component={LinksScreen}
				options={{
					header: props => <LinksHeader {...props} />
				}}
			/>
			<Stack.Screen
				name='Premium'
				component={PremiumScreen}
				options={{
					header: props => <PremiumHeader {...props} />
				}}
			/>
			<Stack.Screen
				name='FAQ'
				component={FAQScreen}
				options={{
					header: props => <FAQHeader {...props} />
				}}
			/>
		</Stack.Navigator>
	);
};

const SearchStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				cardStyleInterpolator: CardStyleInterpolates.forHorizontalIOS
			}}>
			<Stack.Screen
				name='Search'
				component={Search}
				options={{
					header: props => <SearchHeader width={width} {...props} />
				}}
			/>
			<Stack.Screen
				name='SearchGroup'
				component={SearchGroup}
				options={{
					header: props => <SearchGroupHeader {...props} />
				}}
			/>
			<Stack.Screen
				name='SearchAudition'
				component={SearchAudition}
				options={{
					header: props => <SearchAuditionHeader {...props} />
				}}
			/>
			<Stack.Screen
				name='SearchTeachers'
				component={SearchTeachers}
				options={{
					header: props => <SearchTeachersHeader {...props} />
				}}
			/>
		</Stack.Navigator>
	);
};

const NotesStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				cardStyleInterpolator: CardStyleInterpolates.forHorizontalIOS
			}}>
			<Stack.Screen
				name='Notes'
				component={NotesScreen}
				options={{
					header: props => <NotesHeader width={width} {...props} />
				}}
			/>
		</Stack.Navigator>
	);
};

const ServicesStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				cardStyleInterpolator: CardStyleInterpolates.forHorizontalIOS
			}}>
			<Stack.Screen
				name='Services'
				component={ServicesScreen}
				options={{
					header: props => <ServicesHeader width={width} {...props} />
				}}
			/>
			<Stack.Screen
				name='Chat'
				component={Chat}
				options={{
					header: props => <ChatHeader {...props} />
				}}
				navigationKey={'Chat'}
			/>
			<Stack.Screen
				name='ContactInfo'
				component={ContactProfile}
				options={{
					header: props => <ContactProfileHeader {...props} />
				}}
			/>
		</Stack.Navigator>
	);
};

const TabNavigator = () => {
	const navigation = useNavigation();
	return (
		<>
			<Tab.Navigator
				initialRouteName='HomeStack'
				screenOptions={{
					tabBarStyle: { backgroundColor: '#1E1E1F' },
					tabBarShowLabel: false,
					tabBarInactiveTintColor: '#979797',
					tabBarActiveTintColor: '#3eb59f',
					tabBarHideOnKeyboard: true
				}}>
				<Tab.Screen
					name='NotesStack'
					component={NotesStack}
					options={{
						tabBarIcon: ({ color, size }) => (
							<Feather
								name='bookmark'
								size={size}
								color={color}
							/>
						),
						headerShown: false
					}}
				/>
				<Tab.Screen
					name='ServicesStack'
					component={ServicesStack}
					options={{
						tabBarIcon: ({ color, size }) => (
							<Octicons name='apps' size={size} color={color} />
						),
						headerShown: false
					}}
				/>
				<Tab.Screen
					name='HomeStack'
					component={HomeStack}
					options={{
						headerShown: false,
						tabBarIcon: ({ color, size }) => (
							<Feather
								name='calendar'
								size={size}
								color={color}
							/>
						)
					}}
				/>
				<Tab.Screen
					name='SearchStack'
					component={SearchStack}
					options={{
						headerShown: false,
						tabBarIcon: ({ color, size }) => (
							<Ionicons name='search' size={size} color={color} />
						)
					}}
				/>
				<Tab.Screen
					name='MenuStack'
					component={MenuStack}
					options={{
						headerShown: false,
						tabBarIcon: ({ color, size }) => (
							<Feather name='menu' size={size} color={color} />
						)
					}}
				/>
			</Tab.Navigator>
		</>
	);
};

export default TabNavigator;
