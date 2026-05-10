package com.femto.falconia.mapper.impl;

import com.femto.falconia.domain.dto.AddLinkRequestDto;
import com.femto.falconia.domain.dto.LinkDto;
import com.femto.falconia.domain.model.AddLinkRequest;
import com.femto.falconia.domain.entity.Link;
import com.femto.falconia.mapper.LinkMapper;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class LinkMapperImpl implements LinkMapper {

    @Override
    public AddLinkRequest fromAddLinkDto(UUID userId, AddLinkRequestDto dto){
        return new AddLinkRequest(
                userId,
                dto.url(),
                dto.linkName()
        );
    }
    @Override
    public LinkDto toLinkDto(Link link){
        return new LinkDto(
                link.getId(),
                link.getUrl(),
                link.getLinkName());
    }
}
