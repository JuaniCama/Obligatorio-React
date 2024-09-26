import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootTabParamList = {
  Feed: undefined;
  Profile: { isUserProfile: boolean };
};

export type ProfileScreenProps = BottomTabScreenProps<RootTabParamList, 'Profile'>;
