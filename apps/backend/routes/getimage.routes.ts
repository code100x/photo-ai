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

        res.json({ imageUrl: image?.imageUrl, status: image?.status })
    } catch (error) {
        console.error(error)
        res.status(403).json({ msg: "Error while fetching image" })
    }
})