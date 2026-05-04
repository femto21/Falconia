package com.femto.falconia.domain.entity;

public record AddLinkRequest(
        String url,
        String linkName
) {
}
