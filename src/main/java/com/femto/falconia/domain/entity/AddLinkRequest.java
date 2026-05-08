package com.femto.falconia.domain.entity;

import java.util.UUID;

public record AddLinkRequest(
        UUID userId,
        String url,
        String linkName
) {
}
