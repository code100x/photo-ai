import { prismaClient } from "db";
import { Router } from "express"

export const router = Router()

router.post('/status/:falreqid', async (req, res) => {
    const falReqId = req.params.falreqid;
    try {
        const image = await prismaClient.outputImages.findFirst({
            where: {
                AND: [{ falAiRequestId: falReqId }, { userId: req.userId }]
            },
            select: {
                imageUrl: true,
                status: true
            }
        })

        res.json({ imageUrl: "https://v3.fal.media/files/elephant/VBTGCYry98QgJJPGBlkX6_ee4245ec81814803b3c0ca6da0e50eb4.jpg", status: image?.status })
    } catch (error) {
        console.error(error)
        res.status(403).json({ msg: "Error while fetching image" })
    }
})