package com.femto.falconia.mapper.impl;

import com.femto.falconia.domain.dto.AddLinkRequestDto;
import com.femto.falconia.domain.entity.AddLinkRequest;
import com.femto.falconia.mapper.LinkMapper;

public class LinkMapperImpl implements LinkMapper {

    @Override
    public AddLinkRequest fromAddLinkDto(AddLinkRequestDto dto){
        return new AddLinkRequest(

                dto.url(),
                dto.linkName()
        );
    }
    @Override
    public AddLinkRequestDto toAddLinkDto(AddLinkRequest request){
        return new AddLinkRequestDto(

                request.url(),
                request.linkName()
        );
    }
}
