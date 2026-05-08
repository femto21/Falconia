package com.femto.falconia.domain.entity;

import jakarta.persistence.*;

import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "links")
public class Link {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name="user_id", updatable = false, nullable = false)
    private UUID userId;

    @Column(name = "url", nullable = false)
    private String url;

    @Column(name="link_name", nullable = false)
    private String linkName;

    public Link(){}

    public Link(UUID id, String linkName, String url, UUID userId) {
        this.id = id;
        this.linkName = linkName;
        this.url = url;
        this.userId = userId;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getLinkName() {
        return linkName;
    }

    public void setLinkName(String linkName) {
        this.linkName = linkName;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Link links = (Link) o;
        return Objects.equals(id, links.id) && Objects.equals(userId, links.userId) && Objects.equals(url, links.url) && Objects.equals(linkName, links.linkName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userId, url, linkName);
    }

    @Override
    public String toString() {
        return "Link{" +
                "id=" + id +
                ", userId=" + userId +
                ", url='" + url + '\'' +
                ", linkName='" + linkName + '\'' +
                '}';
    }
}
