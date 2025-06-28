package com.paulotech.api_ghibli_ai.controller;

import com.paulotech.api_ghibli_ai.dto.TextGenerationRequestDTO;
import com.paulotech.api_ghibli_ai.service.GhibliArtService;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@Slf4j
@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
@RequiredArgsConstructor
@Validated
public class GenerationController {

    private final GhibliArtService ghibliArtService;

    @PostMapping(value = "/generate", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> generateGhibliArt(
            @RequestParam("image") MultipartFile image,
            @RequestParam("prompt") String prompt) {

        try {
            if (image.isEmpty()) {
                return ResponseEntity.badRequest().body("A imagem não pode estar vazia".getBytes());
            }

            byte[] imageBytes = ghibliArtService.createGhibliArt(image, prompt);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(imageBytes);

        } catch (FeignException e) {
            log.error("Erro na API Stability AI - Status: {}, Mensagem: {}", e.status(), e.contentUTF8());
            return ResponseEntity.status(e.status())
                    .body(e.contentUTF8().getBytes());
        } catch (Exception e) {
            log.error("Erro interno ao processar imagem", e);
            return ResponseEntity.internalServerError()
                    .body(("Erro interno: " + e.getMessage()).getBytes());
        }
    }

    @PostMapping(value = "/generate-from-text", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> generateGhibliArtFromText(
             @RequestBody TextGenerationRequestDTO requestDTO) {

        try {
            // Validação adicional se necessário
            if (requestDTO.getPrompt() == null || requestDTO.getPrompt().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("O prompt não pode estar vazio".getBytes());
            }

            byte[] imageBytes = ghibliArtService.createGhibliArtFromText(
                    requestDTO.getPrompt(),
                    requestDTO.getStyle());

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .body(imageBytes);

        } catch (FeignException e) {
            log.error("Erro na API Stability AI - Status: {}, Mensagem: {}", e.status(), e.contentUTF8());
            return ResponseEntity.status(e.status())
                    .body(e.contentUTF8().getBytes());
        } catch (Exception e) {
            log.error("Erro interno ao gerar imagem do texto", e);
            return ResponseEntity.internalServerError()
                    .body(("Erro interno: " + e.getMessage()).getBytes());
        }
    }
}