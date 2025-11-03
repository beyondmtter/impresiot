import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import useWorkshopAPI from '@/fetchAPI/useWorkshopAPI';

const DeleteWorkshopDialog = ({ open, setOpen, workshopId }) => {
    const { deleteWorkshop } = useWorkshopAPI();

    const handleDelete = async () => {
        await deleteWorkshop(workshopId); 
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[24rem] rounded-[10px] sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Delete Workshop</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this workshop? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-4">
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteWorkshopDialog;
