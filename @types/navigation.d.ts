// Типы для навигации React Navigation
import { NavigatorScreenParams } from '@react-navigation/native';

// Пример: параметры для ContactInfo
export type RootStackParamList = {
	// Главные стеки
	Stack: undefined;
	OnBoard: undefined;
	UserData: undefined;
	// Tab стеки
	HomeStack: undefined;
	MenuStack: undefined;
	NotesStack: undefined;
	SearchStack: undefined;
	ServicesStack: undefined;
	// Экраны
	Home: undefined;
	Info: undefined;
	ContactInfo: { user: any };
	Chat: { chat: any; userB: any };
	UserInfo: undefined;
	Sched: undefined;
	Links: undefined;
	Premium: undefined;
	FAQ: undefined;
	Settings: undefined;
	Search: undefined;
	SearchGroup: undefined;
	SearchAudition: undefined;
	SearchTeachers: undefined;
};

// Для useNavigation и useRoute:
// import { StackNavigationProp } from '@react-navigation/stack';
// type NavigationProp = StackNavigationProp<RootStackParamList, 'ContactInfo'>;
// const navigation = useNavigation<NavigationProp>();

// type RouteProp = RouteProp<RootStackParamList, 'ContactInfo'>;
// const route = useRoute<RouteProp>();
