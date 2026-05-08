package com.femto.falconia.service;

import com.femto.falconia.domain.dto.AddLinkRequestDto;
import com.femto.falconia.domain.entity.AddLinkRequest;
import com.femto.falconia.domain.entity.Link;

import java.util.List;
import java.util.UUID;

public interface LinkService {

    Link addLink(AddLinkRequest request);

    List<Link> getLinksByUser(UUID userId);

}
