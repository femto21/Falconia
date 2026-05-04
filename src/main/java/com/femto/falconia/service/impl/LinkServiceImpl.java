package com.femto.falconia.service.impl;

import com.femto.falconia.domain.dto.AddLinkRequestDto;
import com.femto.falconia.domain.entity.AddLinkRequest;
import org.springframework.stereotype.Service;

@Service
public class LinkServiceImpl {

    @Override
    public Boolean addLink(AddLinkRequestDto dto) {
        AddLinkRequest request = fromAddLinkRequestDto(dto);
    }
}
