package com.femto.falconia.mapper;

import com.femto.falconia.domain.dto.AddLinkRequestDto;
import com.femto.falconia.domain.dto.LinkDto;
import com.femto.falconia.domain.entity.AddLinkRequest;
import com.femto.falconia.domain.entity.Link;

import java.util.UUID;

public interface LinkMapper {

    AddLinkRequest fromAddLinkDto(UUID userId, AddLinkRequestDto dto);

    LinkDto toLinkDto(Link link);
}
