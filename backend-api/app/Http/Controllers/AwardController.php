<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Award;

class AwardController extends Controller
{
    public function list(Request $req)
    {
        $list = new Award;
        $type = $req->get('type');
        $minPoin = $req->get('min_poin');
        $maxPoin = $req->get('max_poin');

        if (!empty($type)) {
            $list->where('type', $type);
        }

        if (!empty($req->get('min_poin')) && !empty($req->get('max_poin'))) {
            $list->whereBetween('poin', $minPoin, $maxPoin );
        }

        $list->paginate(10);

        return response()->json($list);
    }
}
