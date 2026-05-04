package com.femto.falconia.mapper;

import com.femto.falconia.domain.dto.AddLinkRequestDto;
import com.femto.falconia.domain.entity.AddLinkRequest;

public interface LinkMapper {

    AddLinkRequest fromAddLinkDto(AddLinkRequestDto dto);

    AddLinkRequestDto toAddLinkDto(AddLinkRequest request);
}
