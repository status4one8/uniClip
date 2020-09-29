package com.uniclip;

public class Clip {
    private String content;
    private String device;
    private String deviceType = "PHONE";
    private boolean isImage;
    private long time;

    public Clip () {}

    public Clip(String content, String device, long time, boolean isImage) {
        this.content = content;
        this.device = device;
        this.time = time;
        this.isImage = isImage;
    }

    public String getContent() {
        return content;
    }

    public String getDevice() {
        return device;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public boolean isImage() {
        return isImage;
    }

    public long getTime() {
        return time;
    }
}
