package ethan.iot.IotManager.configuration.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JWTAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(
                AbstractHttpConfigurer::disable
        );
        httpSecurity.authorizeHttpRequests(
                auth -> auth
                        .requestMatchers("/api/v1/security/register").permitAll()
                        .requestMatchers("/api/v1/security/auth").permitAll()
                        .requestMatchers("/api/v1/mqtt/authentication").permitAll()
                        .requestMatchers("/api/v1/mqtt/authorization").permitAll()
                        .requestMatchers(antMatcher("/h2-console/**")).permitAll()//to be removed for new DB
                        .anyRequest().authenticated()
        );
        httpSecurity.sessionManagement(
                        session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );
        httpSecurity.authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        httpSecurity.headers(
                header -> header.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
        );
        return httpSecurity.build();
    }

}
