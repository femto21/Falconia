package com.femto.falconia.domain.dto;

import com.femto.falconia.domain.entity.Link;

import java.util.List;
import java.util.UUID;

public record PublicProfileDto(
        String username,
        String firstName,
        String lastName,
        List<Link> links
) {
}
