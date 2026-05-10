package com.femto.falconia.domain.model;

import com.femto.falconia.domain.entity.Link;

import java.util.List;
import java.util.UUID;

public record PublicProfile(
        UUID id,
        String username,
        String firstName,
        String lastName,
        List<Link> links
) {
}
