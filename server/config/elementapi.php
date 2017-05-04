<?php

use craft\elements\Entry;

return [
    'defaults' => [
        'elementType' => Entry::class,
        'elementsPerPage' => 10,
        'pageParam' => 'pg',
        'transformer' => function(Entry $entry) {
            return [
                'title' => $entry->title,
                'id' => $entry->id,
                'url' => $entry->url,
            ];
        },
    ],

    'endpoints' => [
        'api/news' => [
            'criteria' => ['section' => 'articles'],
        ],
        'api/news/<entryId:\d+>.json' => function($entryId) {
            return [
                'criteria' => ['id' => $entryId],
                'one' => true,
            ];
        },
    ]
];