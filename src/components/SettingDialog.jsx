"use client";
import { Dialog } from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import { DialogContent } from "./ui/dialog";
import { Switch } from "./ui/switch";
import { shallowEqual, useSelector } from "react-redux";
import useUserAPI from "@/fetchAPI/useUserAPI";

const SettingDialog = ({ open, setOpen }) => {
    const { updateSetting, updateSession } = useUserAPI();
    const user = useSelector((state) => state.user.userData, shallowEqual);

    const [settings, setSettings] = useState({
        showAbout: true,
        showSocialLink: true,
        showContact: true,
        showFollowers: true,
        showFollowing: true,
    });

    const handleSwitchChange = (name) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: !prevSettings[name],
        }));
    };

    useEffect(() => {
        if(user?.setting){
            setSettings({
                showAbout: user?.setting.showAbout,
                showSocialLink: user?.setting.showSocialLink,
                showContact: user?.setting.showContact,
                showFollowers: user?.setting.showFollowers,
                showFollowing: user?.setting.showFollowing,
            })
        }
    }, [user])

    const handleUpdateSetting = async () => {
        try {
            await updateSetting(settings, user?._id);
            await updateSession()
        } catch (error) {
            console.error("Failed to update settings:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[24rem] rounded-[10px]">
                <h3 className="text-lg font-semibold mb-4">Settings</h3>

                {/* Toggle for 'Show About' */}
                <div className="flex items-center justify-between mb-3">
                    <label htmlFor="showAbout" className="text-[.9rem]">Show About</label>
                    <Switch
                        id="showAbout"
                        checked={settings.showAbout}
                        onCheckedChange={() => handleSwitchChange("showAbout")}
                    />
                </div>

                {/* Toggle for 'Show Social Link' */}
                <div className="flex items-center justify-between mb-3">
                    <label htmlFor="showSocialLink" className="text-[.9rem]">Show Social Links</label>
                    <Switch
                        id="showSocialLink"
                        checked={settings.showSocialLink}
                        onCheckedChange={() => handleSwitchChange("showSocialLink")}
                    />
                </div>

                {/* Toggle for 'Show Contact' */}
                <div className="flex items-center justify-between mb-3">
                    <label htmlFor="showContact" className="text-[.9rem]">Show Contact</label>
                    <Switch
                        id="showContact"
                        checked={settings.showContact}
                        onCheckedChange={() => handleSwitchChange("showContact")}
                    />
                </div>

                {/* Toggle for 'Show Followers' */}
                {/* <div className="flex items-center justify-between mb-3">
                    <label htmlFor="showFollowers" className="text-[.9rem]">Show Followers</label>
                    <Switch
                        id="showFollowers"
                        checked={settings.showFollowers}
                        onCheckedChange={() => handleSwitchChange("showFollowers")}
                    />
                </div> */}

                {/* Toggle for 'Show Following' */}
                {/* <div className="flex items-center justify-between mb-3">
                    <label htmlFor="showFollowing" className="text-[.9rem]">Show Following</label>
                    <Switch
                        id="showFollowing"
                        checked={settings.showFollowing}
                        onCheckedChange={() => handleSwitchChange("showFollowing")}
                    />
                </div> */}

                {/* Update Settings Button */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={handleUpdateSetting}
                        className="bg-neutral-800 text-white py-2 px-4 rounded-md hover:bg-neutral-900 active:scale-95 transition duration-200"
                    >
                        Update Settings
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SettingDialog;
