package com.femto.falconia.mapper.impl;

import com.femto.falconia.domain.dto.PublicProfileDto;
import com.femto.falconia.domain.model.PublicProfile;
import com.femto.falconia.mapper.PublicProfileMapper;
import com.femto.falconia.service.impl.PublicProfileServiceImpl;
import org.springframework.stereotype.Component;

@Component
public class PublicProfileMapperImpl implements PublicProfileMapper {

   @Override
    public PublicProfileDto toPublicProfileDto(PublicProfile publicProfile) {
       return new PublicProfileDto(
               publicProfile.username(),
               publicProfile.firstName(),
               publicProfile.lastName(),
               publicProfile.links()
       );
   }
}
