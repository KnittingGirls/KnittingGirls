import React, { useState } from "react";
import {
    StyleSheet,Text,View,ImageBackground,Dimensions,TouchableOpacity,Image,} from "react-native";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../components/CustomButton";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function UploadImg({ navigation }) {
    const sweetHouse = require("../assets/background/sweetHouse_1.png");
    const [selectedImage, setSelectedImage] = useState(null);

    // 이미지 선택 함수
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaType: ['photo'],
            allowsEditing: true,
            quality: 1,
        });
        // console.log(result);
        if (!result.canceled && result.assets[0].uri) {
            setSelectedImage(result.assets[0]); // 선택한 이미지의 정보 저장
        } else {
            console.log("이미지를 선택하지 않았습니다.");
        }
    };
    // 업로드 함수 수정
    const uploadImage = async () => {
        if (!selectedImage || !selectedImage.uri) {
            alert("이미지를 선택하세요");
            return;
        }
        const formData = new FormData();
        formData.append("image", {
            uri: selectedImage.uri,
            type: selectedImage.mimeType, // 또는 적절한 MIME 타입 (예: image/png)
            name: selectedImage.fileName, // 백엔드에서 요구하는 파일 이름
        });

        try {
            console.log("이미지 업로드 요청 시작");

            //서버 IP 주소로 아래 주소 변경 필요 
            const response = await fetch("http://localhost:8080/api/images/upload", {

                method: "POST",
                body: formData,
            });

            console.log("응답 상태:", response.status);
            const result = await response.text();

            if (!response.ok) {
                console.error("서버 오류:", response.status, response.statusText);
                alert("서버 오류: 이미지 업로드 실패");
                return;
            }

            alert("업로드 성공: " + result);
            navigation.navigate("ShowPattern");            


        } catch (error) {
            console.error("요청 오류:", error);
            alert("이미지 업로드 실패");
        }
    };

    return (
        <View>
            <ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 1 }}></View>
                <View style={styles.upload}>
                    {selectedImage && (
                        <Image source={{ uri: selectedImage.uri }} style={styles.img} />
                    )}
                    <TouchableOpacity onPress={pickImage} style={styles.pickButton}>
                        <Text>이미지 선택</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnContainer}>
                    <CustomButton title="업로드" onPress={uploadImage} />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        alignItems: "center",
    },
    upload: {
        width: "85%",
        marginTop: "70%",
        flex: 8,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        backgroundColor: "rgba(255,255,255,0.6)",
        marginLeft: 6,
        marginRight: 6,
        marginBottom: "5%",
        justifyContent: "center",
        alignItems: "center",
    },
    pickButton: {
        padding: 10,
        backgroundColor: "#ddd",
        borderRadius: 5,
        marginTop: 10,
    },
    btnContainer: {
        flex: 2,
        marginLeft: "55%",
        marginTop: "3%",
    },
    img: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
});