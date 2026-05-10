package com.femto.falconia.domain.model;

import java.util.UUID;

public record AddLinkRequest(
        UUID userId,
        String url,
        String linkName
) {
}
