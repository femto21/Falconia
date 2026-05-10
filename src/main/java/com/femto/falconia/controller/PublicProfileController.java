package com.femto.falconia.controller;


import com.femto.falconia.domain.dto.PublicProfileDto;
import com.femto.falconia.domain.model.PublicProfile;
import com.femto.falconia.mapper.PublicProfileMapper;
import com.femto.falconia.service.LinkService;
import com.femto.falconia.service.PublicProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/profiles")
public class PublicProfileController {

    private final PublicProfileService publicProfileService;
    private final PublicProfileMapper publicProfileMapper;

    public PublicProfileController(PublicProfileService publicProfileService, PublicProfileMapper publicProfileMapper) {
        this.publicProfileService = publicProfileService;
        this.publicProfileMapper = publicProfileMapper;
    }

    @GetMapping(path = "/{username}")
    public ResponseEntity<PublicProfileDto> getProfile(@PathVariable String username) {
        PublicProfile userPublicProfile = publicProfileService.getPublicProfile(username);
        PublicProfileDto dto = publicProfileMapper.toPublicProfileDto(userPublicProfile);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
