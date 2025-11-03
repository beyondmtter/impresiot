import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import useUserAPI from '@/fetchAPI/useUserAPI';

const LogoutDialog = ({ open, setOpen, onConfirmLogout }) => {
    const router = useRouter()
    const { logout, updateSession } = useUserAPI();
    
    const handleLogout = async() => {
        await logout()
        setOpen(false);
        await updateSession()
        window.location.reload();
        router.push("/")

    };

    

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className=" w-[24rem] rounded-[10px] sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Confirm Logout</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to log out? You will need to log back in to access your account.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-4">
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleLogout}>
                        Log Out
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default LogoutDialog;
