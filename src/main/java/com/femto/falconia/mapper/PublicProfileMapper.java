package com.femto.falconia.mapper;

import com.femto.falconia.domain.dto.PublicProfileDto;
import com.femto.falconia.domain.model.PublicProfile;

public interface PublicProfileMapper {

    PublicProfileDto toPublicProfileDto(PublicProfile publicProfile);
}
