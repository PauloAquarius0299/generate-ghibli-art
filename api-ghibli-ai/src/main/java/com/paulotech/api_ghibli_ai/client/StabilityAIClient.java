package com.paulotech.api_ghibli_ai.client;

import com.paulotech.api_ghibli_ai.config.FeignConfig;
import com.paulotech.api_ghibli_ai.dto.TextToImageRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;


@FeignClient(
        name = "stabilityAiClient",
        url = "${stability.api.base-url}",
        configuration = FeignConfig.class
)
public interface StabilityAIClient {
    @PostMapping(
            value = "/v1/generation/${engine_id}text-to-image",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            headers = {"Accept=image/png"}
    )
    byte[] generationImageFromText(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable("engine_id") String engineId,
            @RequestBody TextToImageRequest requestBody
            );
    @PostMapping(
            value = "/v1/generation/{engine_id}/image-to-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            headers = {"Accept=image/png"}
    )
    byte[] generateImageFromImage(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable("engine_id") String engineId,
            @RequestPart("init_image") MultipartFile initImage,
            @RequestPart("text_prompt[0][text]") String textPrompt,
            @RequestPart("style_preset") String stylePreset
    );

}
