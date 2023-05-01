import { Session } from "@inrupt/solid-client-authn-browser";
import { updateMarkerReview } from "../solid/MarkUtils";

export async function fetchImages(images: string[] | File[], fetchImage: any, setImageListItems: any) {
    const items: JSX.Element[] = [];
    for (const img of images) {
        const imageListItem = await fetchImage(img as string);
        items.push(imageListItem);
    }
    setImageListItems(items);
}

export async function onSubmitReviewHelper(marker: any, session: Session, map: string, setState: any, toggleDrawer: any, review: any) {
    if (marker.review === undefined) {
        marker.review = [];
    }
    marker.review.push(review);
    await updateMarkerReview(session, marker, map);
    setState(false);
    toggleDrawer(false);
}

export function toggleDrawerHelper(setState: any, toggleDrawer: any) {
    return (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
            setState(open);
            toggleDrawer(open);
        }
}