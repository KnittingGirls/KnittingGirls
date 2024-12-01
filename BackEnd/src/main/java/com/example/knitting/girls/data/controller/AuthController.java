package com.example.knitting.girls.data.controller;

import com.example.knitting.girls.data.dto.KakaoUserDto;
import com.example.knitting.girls.data.entity.User;
import com.example.knitting.girls.data.security.JwtTokenProvider;
import com.example.knitting.girls.data.service.KakaoOAuth2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private KakaoOAuth2Service kakaoOAuth2Service;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    // 로그인 페이지 매핑
    @GetMapping("/login")
    public String login() {
        String kakaoLoginUrl = "https://kauth.kakao.com/oauth/authorize?response_type=code"
                + "&client_id=23d1da761622fc79819d5e2b74ccf70a"
                + "&redirect_uri=http://localhost:8080/auth/login/callback";

        return "redirect:" + kakaoLoginUrl;  // 카카오 로그인 페이지로 리디렉션
    }

    // 카카오 로그인 후 콜백 처리
    @GetMapping("/login/callback")
    public String kakaoLogin(@RequestParam String code, Model model, HttpServletResponse response) {
        String accessToken = getKakaoAccessToken(code);
        KakaoUserDto userInfo = kakaoOAuth2Service.getUserInfo(accessToken);
        User user = kakaoOAuth2Service.saveOrUpdateUser(userInfo);
        String token = jwtTokenProvider.createToken(user.getId().toString());

        // JWT 토큰 프론트엔드에 전달
        String redirectUri = "http://localhost:8081/SelectActivity?token=" + token;

        return "redirect:" + redirectUri;  // SelectActivity로 리디렉션
    }

    // 카카오 액세스 토큰 받아오기
    private String getKakaoAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();

        String tokenUrl = "https://kauth.kakao.com/oauth/token";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        String body = "grant_type=authorization_code"
                + "&client_id=23d1da761622fc79819d5e2b74ccf70a"
                + "&redirect_uri=http://localhost:8080/auth/login/callback"
                + "&code=" + code;

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, entity, String.class);

        JSONObject responseBody = new JSONObject(response.getBody());
        return responseBody.getString("access_token");
    }
}
