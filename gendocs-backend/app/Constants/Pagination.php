<?php

namespace App\Constants;

abstract class Pagination
{
    const SIZE = 100;
    const NUMBER = 1;

    const SIZE_TEXT = 'size';
    const NUMBER_TEXT = 'number';

    const SIZE_PARAM = Query::PAGE . '[' . Pagination::SIZE_TEXT . ']';
    const NUMBER_PARAM = Query::PAGE . '[' . Pagination::NUMBER_TEXT . ']';
}
