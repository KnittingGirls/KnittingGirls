import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import BigCustomBtn from '../components/BigCustomBtn';


export default function Home({ navigation }) {
    const sweetHouse = require("../assets/background/start_1.png");
    return (
        <View style={styles.container}>
            <ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image} resizeMethod='auto'>
                <View style={{flex:12}}></View>
                <View style={styles.btnContainer}>
                    <BigCustomBtn title="시작하기" onPress={() => navigation.navigate("Login")} />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    image: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        // justifyContent: 'center',
        flexDirection:'column'
    },
    btnContainer: {
        flex:1,
        marginLeft:'17%',
    }
});
