package com.team2.honin.honinserver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OAuthToken {
	private String access_token;
	private String refresh_token;
	private String token_type;
	private int expires_in;

	@Data
	@AllArgsConstructor
	public class NaverOAuthToken {
		private String access_token;
		private String refresh_token;
		private String token_type;
		private int expires_in;

	}

	@Data
	@AllArgsConstructor
	public class KakaoOAuthToken {
		private String access_token;
		private String refresh_token;
		private String token_type;
		private int expires_in;

	}


}

