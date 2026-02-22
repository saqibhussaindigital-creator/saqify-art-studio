'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';

export interface WishlistItem {
    id: string;
    title: string;
    category: string;
    image: string;
    addedAt: string;
}

export function useWishlist() {
    const { data: session } = useSession();
    const email = session?.user?.email;

    const getKey = () => `saqify_wishlist_${email}`;

    const getItems = useCallback((): WishlistItem[] => {
        if (!email) return [];
        try {
            const raw = localStorage.getItem(getKey());
            return raw ? JSON.parse(raw) : [];
        } catch { return []; }
    }, [email]);

    const [items, setItems] = useState<WishlistItem[]>([]);

    useEffect(() => {
        setItems(getItems());
    }, [getItems]);

    const isWishlisted = (id: string) => items.some((i) => i.id === id);

    const toggle = useCallback((item: Omit<WishlistItem, 'addedAt'>) => {
        if (!email) return false; // not logged in
        const current = getItems();
        let updated: WishlistItem[];
        if (current.some((i) => i.id === item.id)) {
            updated = current.filter((i) => i.id !== item.id);
        } else {
            updated = [...current, { ...item, addedAt: new Date().toISOString() }];
        }
        localStorage.setItem(getKey(), JSON.stringify(updated));
        setItems(updated);
        return true;
    }, [email, getItems]);

    return { items, isWishlisted, toggle, isLoggedIn: !!email };
}
