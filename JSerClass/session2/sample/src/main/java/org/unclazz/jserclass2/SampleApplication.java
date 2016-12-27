package org.unclazz.jserclass2;

import org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.context.annotation.ComponentScan;

/**
 * サンプル・アプリケーションのエントリー・ポイント.
 * <p>{@code mvn spring-boot:run}コマンドでビルド/デプロイしたとき
 * このエントリー・ポイントからアプリケーションが起動される。</p>
 */
@EnableAutoConfiguration
@ComponentScan
public class SampleApplication {
    public static void main(String[] args) throws Exception {
        SpringApplication.run(SampleApplication.class, args);
    }
}